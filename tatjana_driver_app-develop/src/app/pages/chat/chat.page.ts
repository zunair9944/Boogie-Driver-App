import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { BasePage } from 'src/app/base.page';
import { PusherService } from 'src/app/services/pusher/pusher.service';
interface Message {
  to_id: number;
  from_id: number;
  user: string;
  type: string;
  created_at: string;
  message: string;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage extends BasePage {

  message = '';
  messages: Array<Message>;
  rider_id:any;
  backRoute = 'chat-inbox';
  isTyping: boolean = false;
  typingTimeout:any;
  auth_id:number;
  messenger_id:any;
  to_user:any;
  // @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('content') private content: any;
  user:any;
  constructor(private pusherService: PusherService,injector: Injector) {
    super(injector)
    this.messages = [];
    this.ngForm = this.formBuilder.group({
      'message' : new FormControl()
    });
    
  }

  override async ngOnInit() {
    this.user = this.cache.get('user_info') || '';
    if(this.user && this.user.length){
      this.user = JSON.parse(this.user);
    }
    this.pusherService.messagesChannel.bind('client-new-message', (message:any) => {
      if (message.from_id == this.messenger_id && message.to_id == this.auth_id) {
        this.messages.push(message);
        let that = this;
        setTimeout(()=>{that.content.scrollToBottom(0);},100); 
      }
    });
    this.pusherService.messagesChannel.bind('client-typing', (data:any) => {
      if (data.from_id == this.messenger_id && data.to_id == this.auth_id) {
        this.isTyping = data.typing;
      }
    });

    this.pusherService.messagesChannel.bind('client-delete-message', (message:any) => {
      if (message.from_id == this.messenger_id && message.to_id == this.auth_id) {
        let filterdResult = this.messages.filter(function (e:any) {
          return e.id != message.id;
      });
      this.messages = filterdResult;
      }
    });
    
  }
  override async ionViewWillEnter() { 
    let msgId = this.cache.get('messenger_id');
    this.messenger_id =  Number(msgId);
    if (history.state.data) {
      let data = history.state.data;
      this.rider_id = data.rider_id;
      this.backRoute = data.backRoute;
      this.to_user = data.to_user
    }
    let userIfo:any = this.cache.get('user_info')
    let data = JSON.parse(userIfo);
    this.auth_id = data.id;
    await this.loadChat();
    // this.content.scrollToBottom(300);
  }

  onTyping(ev:any){
    if(ev.key == 'Enter'){
      this.onSend();
      return
    }    
    if (!this.isTyping) {
      // Trigger typing
      let triggered = this.isTypingFunc(true);
      // triggered
      //   ? console.info("[+] Triggered")
      //   : console.error("[+] Not triggered");
      // Typing now
      // this.isTyping = true;
    }
    // Clear typing timeout
    clearTimeout(this.typingTimeout);
    // Typing timeout
    this.typingTimeout = setTimeout( () => {
      let triggered = this.isTypingFunc(false);
      // triggered
      //   ? console.info("[-] Triggered")
      //   : console.error("[-] Not triggered");
      // // Clear typing now
      // this.isTyping = false;
    }, 1000);
  }
  isTypingFunc(status:any) {
    return this.pusherService.messagesChannel.trigger("client-typing", {
      from_id: this.auth_id, // Me
      to_id: this.messenger_id,//getMessengerId(), // Messenger
      typing: status,
    });
  }
  async onSend() {
    const chat = this.ngForm.value;
    console.log(chat)
    if(chat.message && chat.message){
      chat.from_id = this.auth_id;
      chat.to_id = this.rider_id;
      chat.type = 'rider';
      const response:any = this.apiHelperService.sendMessage(chat);
      this.ngForm.setValue({'message': ''});
      const message: Message = chat
      this.pusherService.messagesChannel.trigger('client-new-message', message);
      this.messages.push(message);
      let that = this;
      setTimeout(()=>{that.content.scrollToBottom(0);},100); 
      // if(response && response.status){
        
      // }
    }
    
  }

  async loadChat(showloader:boolean = true){
    const chat = this.ngForm.value;
    chat.timestamp = new Date().toString();
    const data = {
      id: this.rider_id
    }
    if(showloader)
    this.loadingService.present();
    let response:any  = await this.apiHelperService.fetchMessages(data);
    
    if(response){
      this.messages = response.messages;
      let seenResp:any  = await this.apiHelperService.makeSeen(data);
      if(showloader)
        this.loadingService.dismiss();
      if(seenResp && seenResp.status){
        console.log('msg seen');
      }
      console.log('ionViewDidLoad PersonalChatPage');
      let that = this;
      setTimeout(()=>{that.content.scrollToBottom(0);},200); 
    }
  }

  override goBack(): void {
    this.router.navigateByUrl(this.backRoute);
  }

  async onDelete(message:any){
    this.loadingService.present();
    const data = {'to_id': message.to_id}
    let response:any  = await this.apiHelperService.deleteMessage(data);
    this.loadingService.dismiss();
    if(response && response.status){
      if (message.from_id == this.messenger_id && message.to_id == this.auth_id) {
        let filterdResult = this.messages.filter(function (e:any) {
          return e.id != message.id;
      });
      this.messages = filterdResult;
      this.pusherService.messagesChannel.trigger('client-delete-message', message);
    }
    }
  }

  async getInfo(data:any){

  }
}
