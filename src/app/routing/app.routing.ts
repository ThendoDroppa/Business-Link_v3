import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

// import { ROUTING } from './routing/app.routing';

import { MAIN_ROUTES } from './home-routing.module';
import { THIRD_ROUTES } from './dashboard-routing.module';
import { SECOND_ROUTES } from './admin-routing.module';



import { ConfirmOtpComponent } from '../home/confirm-otp/confirm-otp.component';
import { HomeNavigateComponent } from '../home/home-navigate/home-navigate.component';
import { UserHomeComponent } from '../user-portal/user-home/user-home.component';
import { AdminHomeComponent } from '../admin/admin-home/admin-home.component';
import { NotFoundComponent } from '../home/404/404.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full', },
    { path: '', component: HomeNavigateComponent, data: { title: 'Home Views' }, children: MAIN_ROUTES },
    { path: '', component: AdminHomeComponent, data: { title: 'Admin Portal Views' }, children: SECOND_ROUTES },
    { path: '', component: UserHomeComponent , data: { title: 'User Portal Views' }, children: THIRD_ROUTES },
    {path: '**', component: NotFoundComponent}
]; 

export const routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);