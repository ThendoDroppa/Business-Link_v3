import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ResetPasswordComponent } from '../login/reset-password/reset-password.component';
import { ForgotPasswordComponent } from '../login/forgot-password/forgot-password.component';
import { ConfirmOtpComponent } from '../home/confirm-otp/confirm-otp.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { OnlyLoggedInUsersGuard } from '../guards/onlyLoggedIn.guard';
// import { AlwaysAuthGuard } from '../guards/alwaysAuth.guard';

export const MAIN_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent},
    { path: 'resetpassword', component: ResetPasswordComponent},
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'otp/:email/:oid', component: ConfirmOtpComponent}

];
// export const MAIN_ROUTES: Routes = [
//     { path: '', component: HomeComponent },
//     { path: 'login', component: LoginComponent , canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
//     { path: 'signup', component: SignUpComponent , canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
//     { path: 'resetpassword', component: ResetPasswordComponent , canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
//     { path: 'forgotPassword', component: ForgotPasswordComponent , canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},


// ];


// export const ROUTING: ModuleWithProviders = RouterModule.forRoot(MAIN_ROUTES);