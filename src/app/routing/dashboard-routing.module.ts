import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { OnlyLoggedInUsersGuard } from '../guards/onlyLoggedIn.guard';
import { AlwaysAuthGuard } from '../guards/alwaysAuth.guard';

import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from '../user-portal/dashboard/dashboard.component';
import { NavBarDashboardComponent } from '../user-portal/nav-bar-dashboard/nav-bar-dashboard.component';
import { CompanyQuotationComponent } from '../user-portal/company-quotation/company-quotation.component';
import { CompanyInvoiceComponent } from '../user-portal/company-invoice/company-invoice.component';
import { CreateComponent } from '../user-portal/create/create.component';
import { ReviewComponent } from '../user-portal/review/review.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddCompanyComponent } from '../user-portal/add-company/add-company.component';
import { ViewCompanyInvoiceComponent } from '../user-portal/view-invoice/view-invoice.component';
import { ViewCompanyQuoteComponent } from '../user-portal/view-quote/view-quote.component';


export const THIRD_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'dasboard-navBar', component: NavBarDashboardComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'quotation', component: CompanyQuotationComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'invoice', component: CompanyInvoiceComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'review', component: ReviewComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'create', component: CreateComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'addCompany', component: AddCompanyComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'view-Invoie', component: ViewCompanyInvoiceComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]},
    { path: 'view-Quote', component: ViewCompanyQuoteComponent, canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard]}
]



