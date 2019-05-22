import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  invoice: any;
  userPortalObj: any;
  invoices: any = [];
  company: any;
  companyOid: string;
  loader = false;
  resp: any;
  Billpdf: any;
  resultMsg: string;
  newtotalNumber: number;

  constructor(private admin: AdminService) {
    this.company = JSON.parse(localStorage.getItem('CompanyInvoice'));
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    this.invoice = JSON.parse(localStorage.getItem('invoice'));
    console.log(this.invoice);
  }

  private companyInvoice() {
    this.userPortalObj.getCompanInvoice(this.userPortalObj.token, this.company.oid).subscribe(
      (res) => {
        this.invoices = res;
      }
    );
  }

  ngOnInit() {
    this.admin.getCompany(this.userPortalObj.token, this.invoice.companyOid).subscribe(
      (res) => {
        this.company = res;
      }
    );
  }

  public totalAmont() {
    var totalPrice = 0.0;
    for (var i = 0; i < this.invoice.listOfInvoice.length; i++) {
      totalPrice = totalPrice + (((this.invoice.listOfInvoice[i].price * this.invoice.listOfInvoice[i].quantity)) * (this.invoice.salesTax / 100)) + (this.invoice.listOfInvoice[i].price * this.invoice.listOfInvoice[i].quantity);
    }
    var newtotalPrice = totalPrice - this.invoice.discountAmt;
    return newtotalPrice;
  }

  downloadFile() {
    var invoiceData = {
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
        "addresssLine1": this.invoice.recipientAddress.addresssLine1,
        "locality": this.invoice.recipientAddress.locality,
        "city": this.invoice.recipientAddress.city,
        "postalCode": this.invoice.recipientAddress.postalCode
      },
      "listOfInvoice": this.invoice.listOfInvoice,
      "actionType": "download",
      "image": this.company.base64Logo
    };
    this.loader = true;
    this.admin.downloadInvoice(invoiceData, this.userPortalObj.token).subscribe(
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
          a.setAttribute("download", elementTitle);
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
