import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CustomerServicePageModule } from './pages/customer-service/customer-service.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
    // loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'phone-verify',
    loadChildren: () => import('./pages/phone-verify/phone-verify.module').then(m => m.PhoneVerifyPageModule)
  },
  {
    path: 'code-send',
    loadChildren: () => import('./modals/code-send/code-send.module').then(m => m.CodeSendPageModule)
  },
  {
    path: 'verification-code',
    loadChildren: () => import('./pages/verification-code/verification-code.module').then(m => m.VerificationCodePageModule)
  },
  {
    path: 'six-digit-code',
    loadChildren: () => import('./modals/six-digit-code/six-digit-code.module').then(m => m.SixDigitCodePageModule)
  },
  {
    path: 'personal-info',
    loadChildren: () => import('./pages/personal-info/personal-info.module').then(m => m.PersonalInfoModule)
  },
  {
    path: 'car-info',
    loadChildren: () => import('./pages/car-info/car-info.module').then(m => m.CarInfoModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./pages/about-me/about-me.module').then(m => m.AboutMePageModule)
  },
  {
    path: 'customer-service',
    loadChildren: () => import('./pages/customer-service/customer-service.module').then(m => CustomerServicePageModule)
  },
  {
    path: 'my-rides',
    loadChildren: () => import('./pages/my-rides/my-rides.module').then(m => m.MyRidesPageModule)
  },
  {
    path: 'chat-inbox',
    loadChildren: () => import('./pages/chat-inbox/chat-inbox.module').then(m => m.ChatInboxPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'home-ride',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'search-ride',
    loadChildren: () => import('./pages/search-ride/search-ride.module').then(m => m.SearchRidePageModule)
  },
  {
    path: 'confirm-ride',
    loadChildren: () => import('./pages/confirm-ride/confirm-ride.module').then(m => m.ConfirmRidePageModule)
  },
  {
    path: 'ride-expired',
    loadChildren: () => import('./pages/ride-expired/ride-expired.module').then(m => m.RideExpiredPageModule)
  },
  {
    path: 'pickup-ride',
    loadChildren: () => import('./pages/pickup-ride/pickup-ride.module').then(m => m.PickupRidePageModule)
  },
  {
    path: 'on-way',
    loadChildren: () => import('./pages/on-way/on-way.module').then(m => m.OnWayPageModule)
  },
  {
    path: 'arrived',
    loadChildren: () => import('./pages/arrived/arrived.module').then(m => m.ArrivedPageModule)
  },
  {
    path: 'end-ride',
    loadChildren: () => import('./modals/end-ride/end-ride.module').then(m => m.EndRidePageModule)
  },
  {
    path: 'subscription-renewal',
    loadChildren: () => import('./pages/subscription-renewal/subscription-renewal.module').then(m => m.SubscriptionRenewalPageModule)
  },
  {
    path: 'card-information',
    loadChildren: () => import('./pages/card-information/card-information.module').then(m => m.CardInformationPageModule)
  },
  {
    path: 'forgot-password-1',
    loadChildren: () => import('./modals/forgot-password-modal/forgot-password-modal.module').then(m => m.ForgotPasswordModalPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'select-card',
    loadChildren: () => import('./modals/card-modal/card-modal.module').then(m => m.CardModalPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./modals/success/success.module').then(m => m.SuccessPageModule)
  },
  {
    path: 'upload-id',
    loadChildren: () => import('./pages/upload-id/upload-id.module').then(m => m.UploadIdPageModule)
  },
  {
    path: 'choose-pic-modal',
    loadChildren: () => import('./modals/choose-pic-modal/choose-pic-modal.module').then(m => m.ChoosePicModalPageModule)
  },
  {
    path: 'ride-details',
    loadChildren: () => import('./pages/ride-details/ride-details.module').then(m => m.RideDetailsPageModule)
  },
  {
    path: 'calling',
    loadChildren: () => import('./modals/calling/calling.module').then(m => m.CallingPageModule)
  },
  {
    path: 'cancel-ride-modal',
    loadChildren: () => import('./modals/cancel-ride-modal/cancel-ride-modal.module').then(m => m.CancelRideModalPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./modals/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'confirm-ride-modal',
    loadChildren: () => import('./modals/confirm-ride-modal/confirm-ride-modal.module').then(m => m.ConfirmRideModalPageModule)
  },
  {
    path: 'accept-ride-modal',
    loadChildren: () => import('./modals/accept-ride/accept-ride-modal.module').then(m => m.AcceptRideModalPageModule)
  },
  {
    path: 'arrived-modal',
    loadChildren: () => import('./modals/arrived/arrived-modal.module').then(m => m.ArrivedModalPageModule)
  },
  {
    path: 'end-trip-modal',
    loadChildren: () => import('./modals/end-trip/end-trip-modal.module').then(m => m.EndTripModalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
