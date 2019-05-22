import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  company: any;
  adminObj: any;
  constructor() {
    this.company = JSON.parse(localStorage.getItem('company'));
    this.adminObj = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.company);
    // console.log(this.adminObj);
    // console.log(this.company.companyName);
  }

  ngOnInit() {}
}
