import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Router} from '@angular/router';
import { User } from '../models/user';
import { Login } from '../models/login';
import { AdminService } from './../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  adminObj: any;
  users: any = [];
  companies: any = [];
  company: any = [];
  invoices: any = [];
  quotes: any = [];

  constructor(private admin: AdminService, private route: Router) {
    this.adminObj =  JSON.parse(localStorage.getItem('userInfo'));
    this.getCompanies(this.adminObj.token);
   }

  ngOnInit() {
    this.adminObj =  JSON.parse(localStorage.getItem('userInfo'));
    this.company = JSON.parse(localStorage.getItem('CompanyInvoice'));
    // console.log(this.company);
    // console.log(this.adminObj);
    this.getUsers(this.adminObj.token);
    this.getInvoices(this.adminObj.token);
    this.getQuotes(this.adminObj.token);
    this.getCompanies(this.adminObj.token);
  }

  private getUsers(token) {
    this.admin.getAllUsers(token).subscribe(
      (res) => {
        this.users = res;
      }
    );
  }

  private getCompanies(token) {
    this.admin.getAllCompanies(token).subscribe(
      (res) => {
        this.companies = res;
      }
    );
  }

  private getInvoices(token) {
    this.admin.getAllInvoices(token).subscribe(
      (res) => {
        this.invoices = res;
      }
    );
  }

  private getQuotes(token) {
    this.admin.getAllQuotes(token).subscribe(
      (res) => {
        this.quotes = res;
      }
    );
  }

  public viewCompany(company) {
    // console.log(company);
    localStorage.setItem('company', JSON.stringify(company));
    this.route.navigateByUrl('/viewCompany');
  }

  public viewUser(user) {
    // console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.route.navigateByUrl('/viewUser-Admin');
  }

  public viewQuote(quote) {
    // console.log(quote);
    localStorage.setItem('quote', JSON.stringify(quote));
    this.route.navigateByUrl('/viewQuote-Admin');
  }

  public viewInvoice(invoice) {
    // console.log(invoice);
    localStorage.setItem('invoice', JSON.stringify(invoice));
    this.route.navigateByUrl('/viewInvoice-Admin');
  }
}
