import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css']
})
export class ViewQuoteComponent implements OnInit {

  quote: any;
  company: any;
  adminObj: any;
  loader : boolean = false;
  resp : any;
  Billpdf : any;
  resultMsg : string;

  constructor(private admin: AdminService) {
    this.quote = JSON.parse(localStorage.getItem('quote'));
    this.adminObj = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.quote);

  }

  ngOnInit() {

    this.admin.getCompany(this.adminObj.token, this.quote.companyOid).subscribe(
      (res) => {
        this.company = res;
        console.log(this.company);
      }
    );
  }

  public totalAmont(): number {

    var totalPrice = 0.0;
    for (var i = 0; i < this.quote.listOfInvoice.length; i++) {
      totalPrice = totalPrice + (this.quote.listOfInvoice[i].price * this.quote.listOfInvoice[i].quantity);
    };
    return totalPrice;
  }


  downloadFile() {
    
  
      var invoiceData = {
        "companyOid": this.quote.companyOid,
        "generatedDate": this.quote.generatedDate,
        "reference" : this.quote.reference,
        "recipientName": this.quote.recipientName,
        "recipientEmail":this.quote.recipientEmail,
        "discountAmt" : this.quote.discountAmt,
        "salesTax" : this.quote.salesTax,
        "bankName": this.quote.bankName,
        "accountName": this.quote.accountName,
        "accountNo": this.quote.accountNo,
        "branchCode": this.quote.branchCode,
        "actualRecipient": this.quote.actualRecipient,
        "recipientPhone": this.quote.recipientPhone,
        "recipientAddress":{
            "addresssLine1": this.quote.recipientAddress.addresssLine1, 
             "locality": this.quote.recipientAddress.locality,
             "city": this.quote.recipientAddress.city,
             "postalCode": this.quote.recipientAddress.postalCode
         } ,
         "listOfInvoice" : this.quote.listOfInvoice,
         "actionType" : "download",
         "image" : this.company.base64Logo
      };
      this.loader = true;
      this.admin.downloadInvoice(invoiceData, this.adminObj.token).subscribe(
        (res) => {
          this.resp = res;
          if (this.resp.fileBytes != null) {
  
            this.Billpdf = 'data:application/octet-stream;base64,' + this.resp.fileBytes;
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("id", "qtlink")
            // a.style = "display: none";
  
            document.getElementById('qtlink').title = this.company.companyName + "-" + invoiceData.reference + '.pdf';
            var elementTitle = document.getElementById('qtlink').title;
            a.setAttribute("download", elementTitle)
            a.href = this.Billpdf;
            a.click();
            this.loader = false;
  
          } else {
            this.resultMsg = "Bill quote successfully downloaded.";
            this.loader = false;
          }
  
        }, (err) => {
          alert("Failed to download bill document");
        }
      );
  
     
    }


}
