import { Component, Injector } from '@angular/core';
import { BasePage } from './base.page';
import { PhotoService } from './services/photo.service';
import { UsersService } from './services/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends BasePage {
  user:any;
  userName:string;
  userImage:any = '/assets/icon/user-2.png';
  isProfilePicUpload: any;
  constructor(private userService: UsersService,private photoService: PhotoService,injector: Injector) {
    super(injector)
    // this.user = this.cache.get('user_info') || '';
    // if(this.user && this.user.length){
    //   this.user = JSON.parse(this.user);
    // }
    // debugger
    this.isProfilePicUpload = Number(this.cache.get("is_profile_image_uploaded"));
    this.userImage = this.cache.get('profile_image') || this.userImage;
    this.userService.editUserImg(this.userImage);  
  }
  ngOnInit(): void {
    this.userService.castUser.subscribe(user=> this.userName = user);
    this.userService.castImg.subscribe(profileImg=> this.userImage = profileImg);
  }
  goToLink(route:any){
    this.modalCtrl.dismiss();
    this.router.navigateByUrl(route)
  }
  async logout(){
    this.modalCtrl.dismiss();
    this.loadingService.present()
    try{
      
      const resp:any = await this.authService.logout();
      if(resp && resp.status == true){
        this.router.navigateByUrl('/signin')
      }else{
        this.alertService.presentErrorAlert(resp.message)
      }
      
    }catch(e:any){
      this.alertService.presentErrorAlert(e['message']);
    }finally{
      this.loadingService.dismiss()
    }
    
  }
  async updateImage(){
    const  response:any = await this.photoService.addNewToGallery();
    this.userImage = response?.webviewPath;
    if(response?.imageId){
      try{
        const payload = {id: response.imageId}
        const resp:any = await this.apiHelperService.updateImage(payload)
        this.cache.store('profile_image',resp?.data.link);
        this.isProfilePicUpload = 1;
        this.cache.store('is_profile_image_uploaded', 1);
      }catch(ex:any){
        console.log(ex.error.message)
      }
    }
    
  }
  editProfile(){
    document.getElementById("signupnave")?.click();
    this.goToLink('/signup');
  }
}
