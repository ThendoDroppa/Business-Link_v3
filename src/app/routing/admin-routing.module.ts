import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { OnlyLoggedInUsersGuard } from '../guards/onlyLoggedIn.guard';
import { AlwaysAuthGuard } from '../guards/alwaysAuth.guard';

import { HomeComponent } from '../home/home.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminNavBarComponent } from '../admin/admin-nav-bar/admin-nav-bar.component';
import { ViewCompanyComponent } from '../admin/view-company/view-company.component';
import { ViewUserComponent } from '../admin/view-user/view-user.component';
import { ViewInvoiceComponent } from '../admin/view-invoice/view-invoice.component';
import { ViewQuoteComponent } from '../admin/view-quote/view-quote.component';

export const SECOND_ROUTES : Routes = [
    { path : '', component : HomeComponent},
    { path : 'admin', component : AdminComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path : 'viewCompany', component : ViewCompanyComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path : 'viewUser', component : ViewUserComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path : 'viewInvoie', component : ViewInvoiceComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path : 'viewQuote-admin', component : ViewQuoteComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]}
   
]
