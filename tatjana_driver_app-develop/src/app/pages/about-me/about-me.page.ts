import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base.page';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.page.html',
  styleUrls: ['./about-me.page.scss'],
})
export class AboutMePage extends BasePage {

  signUpError: string = ''
  splashBgBottom = 'assets/icon/bottombg2.svg';
  show: boolean = false;
  showRe: boolean = false;
  showCnt = true;
  nextRoute = '/car-info';
  addMode:boolean = false;
  constructor(private ref: ChangeDetectorRef,injector: Injector) {
    super(injector)
   }

  override ngOnInit() {
    this.initForm()
  }
  override ionViewWillEnter(){
    let addMode:any = this.cache.get('addMode');
    if(addMode != null){
      this.addMode = addMode == "0" ? false : true;
    }
    this.showCnt = true
    if (history.state.data) {
      this.nextRoute = history.state.data.backRoute;
    }
    let carInfoValues: any = this.cache.get('aboutMe')
    if (carInfoValues) {
      carInfoValues = carInfoValues ? JSON.parse(carInfoValues) : null;
      if (carInfoValues && Object.keys(carInfoValues).length) {
        Object.keys(carInfoValues).forEach(name => {
          if (this.ngForm.controls[name]) {
            this.ngForm.controls[name].patchValue(carInfoValues[name]);
          }
        });
      }
    }
  }
  initForm(){
    this.ngForm = this.formBuilder.group({
      next_place: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      movie: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      fun_fact: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      live_without: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      obsessed_with: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      next_time: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
      fear: new FormControl('', Validators.compose([
        // Validators.required,
      ])),
    });
  }

  async submit() {
    const input = this.ngForm.value;
    Object.keys(input).forEach(name => {
      if (this.ngForm.controls[name]) {
        this.ngForm.controls[name].markAsTouched();
      }
    });
    this.submitAttempted = true;
    if (this.ngForm.valid) {
      try {
        this.loadingService.present();
        const input = {
          next_place: this.ngForm.value.next_place,
          movie: this.ngForm.value.movie,
          fun_fact: this.ngForm.value.fun_fact,
          live_without: this.ngForm.value.live_without,
          obsessed_with: this.ngForm.value.obsessed_with,
          next_time: this.ngForm.value.next_time,
          fear: this.ngForm.value.fear
        };
        // let registerStorage:any = {}
        // if(this.cache.get('register') != null){
        //   registerStorage = this.cache.get('register') || ''
        //   registerStorage = JSON.parse(registerStorage);
        // }
        
        // console.log('input', input);
        // registerStorage['aboutMe'] = input;
        this.cache.store('aboutMe', JSON.stringify(input));
        this.loadingService.dismiss();
        this.showCnt = false;
        this.ref.detectChanges();
        this.router.navigateByUrl(this.nextRoute);
        
      }
      catch (error) {
        console.error('login error', error);
        // let errorMessage = error.errorMessageTranslate || (error.response ? error.response.data : (error.message || error));
      }
      finally {
        this.loadingService.dismiss(true);
      }
    }
  }

  get f() {
    return this.ngForm.controls;
  }
  backRoute(){
    this.showCnt = false;
    this.ref.detectChanges();
    this.router.navigateByUrl('personal-info')
  }

}
