import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.css']
})
export class AdminInvoicesComponent implements OnInit {
  invoices: any = [];
  invoice: any;
  constructor() { }

  ngOnInit() {
  }

}
