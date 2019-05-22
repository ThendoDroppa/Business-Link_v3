import { Component, OnInit } from '@angular/core';
import { Quote } from '@angular/compiler';
import { Response } from '@angular/http'
import { UserPortalService } from '../../services/userPortal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css']
})
export class ViewCompanyQuoteComponent implements OnInit {

  loader: boolean = false;
  quote: any;
  company: any;
  tax: number;
  discount: number;
  totalAmount: number;
  userPortalObj: any;
  invoiceData;
  Billpdf;
  a: any;

  constructor(private userPortal: UserPortalService, private route: Router) {
    this.quote = JSON.parse(localStorage.getItem('quotes'));
    this.company = JSON.parse(localStorage.getItem('CompanyQuote'));
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(this.company);
  }

  ngOnInit() {
    this.tax = (this.quote.salesTax == null) ? 0.0 : this.quote.salesTax;
    this.discount = (this.quote.discountAmt == null) ? 0.0 : this.quote.discountAmt;
    this.totalAmount = ((this.totalAmont() + ((this.totalAmont() * (this.tax / 100)))) - this.discount);
    // console.log(this.totalAmont());
    // console.log(((this.totalAmont() * (this.tax / 100))));
  }

  public totalAmont() {
    var totalPrice = 0.0;
    for (var i = 0; i < this.quote.listOfInvoice.length; i++) {
      totalPrice = totalPrice + ((this.quote.listOfInvoice[i].price * this.quote.listOfInvoice[i].quantity));
    }
    return totalPrice;
  }

  public downloadFile() {
    var quoteData = {
      'companyOid': this.quote.companyOid,
      'generatedDate': this.quote.generatedDate,
      'reference': this.quote.reference,
      'recipientName': this.quote.recipientName,
      'recipientEmail': this.quote.recipientEmail,
      'discountAmt': this.quote.discountAmt,
      'salesTax': this.quote.salesTax,
      'bankName': this.quote.bankName,
      'accountName': this.quote.accountName,
      'accountNo': this.quote.accountNo,
      'branchCode': this.quote.branchCode,
      'actualRecipient': this.quote.actualRecipient,
      'recipientPhone': this.quote.recipientPhone,
      'recipientAddress': {
        'addresssLine1': this.quote.recipientAddress.adrressLine1,
        'locality': this.quote.recipientAddress.locality,
        'city': this.quote.recipientAddress.city,
        'postalCode': this.quote.recipientAddress.code
      },
      'listOfInvoice': this.quote.listOfInvoice,
      'actionType': 'download',
      'image': this.company.base64Logo
    };
    this.loader = true;
    this.userPortal.downloadQuote(quoteData, this.userPortalObj.token).subscribe(
      (res) => {
        this.invoiceData = res;
        if (this.invoiceData != null) {
          this.Billpdf = 'data:application/octet-stream;base64,' + this.invoiceData.fileBytes;
          this.a = document.createElement('a');
          document.body.appendChild(this.a);
          this.a.setAttribute('id', 'qtlink');
          this.a.style = 'display: none';

          document.getElementById('qtlink').title = this.company.companyName + '-' + this.quote.reference + '.pdf';
          var elementTitle = document.getElementById('qtlink').title;
          this.a.setAttribute('download', elementTitle);
          // var dlnk = document.getElementById('DIDCdwnldLnk');
          this.a.href = this.Billpdf;
          this.a.click();
          this.loader = false;
        } else {
          this.loader = false;
        }
      }, (error) => {
        this.loader = false;
      }
    );
  }
}
