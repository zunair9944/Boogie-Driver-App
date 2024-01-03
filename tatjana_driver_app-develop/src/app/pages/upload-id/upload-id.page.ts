import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Photo, UploadImageCache } from 'src/app/common/photo.interface';
import { BasePage } from 'src/app/base.page';
import { PhotoService } from 'src/app/services/photo.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-upload-id',
  templateUrl: './upload-id.page.html',
  styleUrls: ['./upload-id.page.scss'],
})
export class UploadIdPage extends BasePage {

  constructor(public modalController: ModalController, private ref: ChangeDetectorRef, injector: Injector, public photoService: PhotoService) {
    super(injector)
  }
  uploadImage: UploadImageCache;
  photo: Photo = { webviewPath: '/assets/icon/img-placeholder.svg', base64: '', imageId: '' };

  // ngOnInit() {
  //   const uploadedPhoto: any = this.cache.get('uploaded-image');
  //   
  //   console.log(JSON.parse(uploadedPhoto));

  //   this.uploadImage = JSON.parse(uploadedPhoto);
  //   console.log(this.uploadImage.image);
  //   this.photo = this.uploadImage.image;
  // }

  ionViewWillEnter(): void {
    // console.log('histor.state=====', history.state)
    if(history.state.data){
      const uploadedPhoto: any = history.state.data
      this.uploadImage = uploadedPhoto;
      // console.log(this.uploadImage.image);
      this.photo = this.uploadImage.image;
      // this.cache.store(this.uploadImage.placeholderName, JSON.stringify(this.uploadImage.image));
    }
  }

  handleNextClick() {
    // console.log(this.uploadImage);
    const uploadImage = {
      image: this.photo,
      backUrl: this.uploadImage.backUrl,
      placeholderName: this.uploadImage.placeholderName
    }
    const navExtras: NavigationExtras = {
      state: {
        data: uploadImage
      }
    };
    this.router.navigateByUrl(this.uploadImage.backUrl, navExtras);
  }

  async uploadNewImage() {
    this.photo = await this.photoService.addNewToGallery();
    this.cache.store(this.uploadImage.placeholderName, JSON.stringify(this.photo));
    const uploadImage = {
      image: this.photo,
      backUrl: this.uploadImage.backUrl,
      placeholderName: this.uploadImage.placeholderName
    }
    // this.cache.store('uploaded-image', JSON.stringify(uploadImage));
  }

}
