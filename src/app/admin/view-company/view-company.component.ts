import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  company : any;
  constructor() { 
    this.company = JSON.parse(localStorage.getItem('company'));
  }

  ngOnInit() {
  }

}
