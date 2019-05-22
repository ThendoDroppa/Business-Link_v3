import { Component, OnInit } from '@angular/core';
import { UserPortalService } from '../../services/userPortal.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewCompanyInvoiceComponent implements OnInit {

  invoice: any;
  company: any;
  totalAmount: number;
  tax: number;
  discount: number;
  loader: boolean;
  userPortalObj: any;
  invoiceData: any;
  Billpdf: any;
  a: any;

  constructor(private userPortal: UserPortalService) {
    this.invoice = JSON.parse(localStorage.getItem('invoice'));
    this.company = JSON.parse(localStorage.getItem('CompanyInvoice'));
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.company);
    console.log(this.invoice);
  }

  ngOnInit() {
    this.tax = (this.invoice.salesTax == null) ? 0.0 : this.invoice.salesTax;
    this.discount = (this.invoice.discountAmt == null) ? 0.0 : this.invoice.discountAmt;
    this.totalAmount = ((this.totalAmont() + (this.totalAmont() * (this.tax / 100))) - this.discount);
    //console.log(this.totalAmont());
    //console.log(((this.totalAmont() * (this.tax / 100))));
  }

  public totalAmont() {
    var totalPrice = 0.0;
    for (var i = 0; i < this.invoice.listOfInvoice.length; i++) {
      totalPrice = totalPrice + (this.invoice.listOfInvoice[i].price * this.invoice.listOfInvoice[i].quantity);
    }
    return totalPrice;
  }

  public downloadFile() {
    var quoteData = {
      "companyOid": this.invoice.companyOid,
      "generatedDate": this.invoice.generatedDate,
      "reference": this.invoice.reference,
      "recipientName": this.invoice.recipientName,
      "recipientEmail": this.invoice.recipientEmail,
      "discountAmt": this.invoice.discountAmt,
      "salesTax": this.invoice.salesTax,
      "bankName": this.invoice.bankName,
      "accountName": this.invoice.accountName,
      "accountNo": this.invoice.accountNo,
      "branchCode": this.invoice.branchCode,
      "actualRecipient": this.invoice.actualRecipient,
      "recipientPhone": this.invoice.recipientPhone,
      "recipientAddress": {
        "addresssLine1": this.invoice.recipientAddress.adrressLine1,
        "locality": this.invoice.recipientAddress.locality,
        "city": this.invoice.recipientAddress.city,
        "postalCode": this.invoice.recipientAddress.code
      },
      "listOfInvoice": this.invoice.listOfInvoice,
      "actionType": "download",
      "image": this.company.base64Logo
    };
    this.loader = true;
    this.userPortal.downloadInvoice(quoteData, this.userPortalObj.token).subscribe(
      (res) => {
        this.invoiceData = res;
        if (this.invoiceData != null) {
          this.Billpdf = 'data:application/octet-stream;base64,' + this.invoiceData.fileBytes;
          this.a = document.createElement("a");
          document.body.appendChild(this.a);
          this.a.setAttribute("id", "qtlink")
          this.a.style = "display: none";

          document.getElementById('qtlink').title = this.company.companyName + "-" + this.invoice.reference + '.pdf';
          var elementTitle = document.getElementById('qtlink').title;
          this.a.setAttribute("download", elementTitle);

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
