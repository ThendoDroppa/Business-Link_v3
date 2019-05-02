import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginService } from './services/login.service';
import { SharedService } from './services/shared.service';
import { AdminService } from './services/admin.service';
import { UserPortalService } from './services/userPortal.service';


import { routing } from './routing/app.routing';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { DashboardComponent } from './user-portal/dashboard/dashboard.component';
import { NavBarDashboardComponent } from './user-portal/nav-bar-dashboard/nav-bar-dashboard.component';
import { CompanyQuotationComponent } from './user-portal/company-quotation/company-quotation.component';
import { CompanyInvoiceComponent } from './user-portal/company-invoice/company-invoice.component';
import { CreateComponent } from './user-portal/create/create.component';
import { ReviewComponent } from './user-portal/review/review.component';
import { QuoteDetailsComponent } from './user-portal/quote-details/quote-details.component';
import { InvoiceDetailsComponent } from './user-portal/invoice-details/invoice-details.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminQuotationsComponent } from './admin/admin-quotations/admin-quotations.component';
import { AdminInvoicesComponent } from './admin/admin-invoices/admin-invoices.component';
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar.component';
import { ConfirmOtpComponent } from './home/confirm-otp/confirm-otp.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { HomeNavigateComponent } from './home/home-navigate/home-navigate.component';
import { UserHomeComponent } from './user-portal/user-home/user-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NotFoundComponent } from './home/404/404.component';
import { ViewCompanyComponent } from './admin/view-company/view-company.component';
import { ViewUserComponent } from './admin/view-user/view-user.component';
import { ViewInvoiceComponent } from './admin/view-invoice/view-invoice.component';
import { ViewQuoteComponent } from './admin/view-quote/view-quote.component';
import { AddCompanyComponent } from './user-portal/add-company/add-company.component';

import { ViewCompanyInvoiceComponent } from './user-portal/view-invoice/view-invoice.component';
import { ViewCompanyQuoteComponent } from './user-portal/view-quote/view-quote.component';


import { OnlyLoggedInUsersGuard } from './guards/onlyLoggedIn.guard';
import { AlwaysAuthGuard } from './guards/alwaysAuth.guard';
import { UserLoggInService } from './services/loggedInUser.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    DashboardComponent,
    NavBarDashboardComponent,
    CompanyQuotationComponent,
    CompanyInvoiceComponent,
    CreateComponent,
    ReviewComponent,
    QuoteDetailsComponent,
    InvoiceDetailsComponent,
    AdminComponent,
    UsersComponent,
    AdminQuotationsComponent,
    AdminInvoicesComponent,
    AdminNavBarComponent,
    ConfirmOtpComponent,
    ForgotPasswordComponent,
    HomeNavigateComponent,
    UserHomeComponent,
    AdminHomeComponent,
    NotFoundComponent,
    ViewCompanyComponent,
    ViewUserComponent,
    ViewInvoiceComponent,
    ViewQuoteComponent,
    AddCompanyComponent,
    ViewCompanyInvoiceComponent,
    ViewCompanyQuoteComponent,
    MainComponent




  ],
  imports: [
    BrowserModule, routing, RouterModule, FormsModule, HttpClientModule, HttpModule,
  ],
  providers: [LoginService, SharedService, AdminService, UserPortalService, AlwaysAuthGuard, UserLoggInService, OnlyLoggedInUsersGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
