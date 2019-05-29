import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPortalService } from '../../services/userPortal.service';
import { from } from 'rxjs/observable/from';
import { Company } from '../../models/company';
import { User } from '../../models/user';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  // @ViewChild('myBankForm') bankForm : NgForm;
  userPortalObj: any;
  company: any;
  invoiceData: any;
  invoices: any;
  isValidFormSubmitted = false;
  bill: any;
  invoice: any;
  quote: boolean;
  errorText: any;
  Billpdf = null;
  resultMsg: any;
  loader: boolean;
  email: any;
  listOfInvoice: any;
  list: any = [];
  billValid: boolean;
  modelshow: boolean;
  rdInvoice: boolean;
  checked: boolean;
  value: string;
  bankname: string;
  accountHolder: string;
  accountNo: string;
  branch: string;
  resp: any;
  total: any;

  constructor(private userPortal: UserPortalService, private route: Router) { }

  ngOnInit() {
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    this.company = JSON.parse(localStorage.getItem('CompanyQuote'));
    this.invoiceData = JSON.parse(localStorage.getItem('data'));
    console.log(this.invoiceData);
    console.log(this.userPortalObj);
  }

  onFormSubmit(form: NgForm, bankForm: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    } else {
    }
    if (this.invoice !== undefined || this.quote !== undefined) {
      if (this.invoice !== undefined) {
        this.email = this.company.email;
        // console.log(this.email);
        // this.listOfInvoice = this.invoiceData.listOfInvoice;
        this.loader = true;

        if (bankForm.valid) {
          const invoiceDataObj = {
              'companyOid': this.company.oid,
              'generatedDate': this.invoiceData.generatedDate,
              'reference': this.invoiceData.reference,
              'recipientName': this.invoiceData.recipientName,
              'recipientEmail': this.invoiceData.recipientEmail,
              'discountAmt': this.invoiceData.discountAmt,
              'salesTax': this.invoiceData.salesTax,
              'bankName': this.bankname,
              'accountName': this.accountHolder,
              'accountNo': this.accountNo,
              'branchCode': this.branch,
              'actualRecipient': this.email,
              'recipientPhone': this.invoiceData.recipientPhone,
              'recipientAddress': {
                'addresssLine1': this.invoiceData.address.addressLine1,
                'locality': this.invoiceData.address.locality,
                'city': this.invoiceData.address.city,
                'postalCode': this.invoiceData.address.postalCode
              },
              'listOfInvoice': this.invoiceData.listOfInvoice,
              'actionType': 'download',
              'image': this.company.base64Logo,
            };

          this.userPortal.downloadInvoice(invoiceDataObj, this.userPortalObj.token).subscribe(
            (res) => {
              console.log(res);
              this.resp = res;

              if (this.resp.fileBytes != null) {
                // console.log(this.resp.fileBytes);
                this.Billpdf = 'data:application/octet-stream;base64,' + this.resp.fileBytes;
                // console.log(this.Billpdf);
                const a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('id', 'qtlink');
                // a.style = "display: none";

                document.getElementById('qtlink').title = this.company.companyName + '-' + this.invoiceData.reference + '.pdf';
                const elementTitle = document.getElementById('qtlink').title;
                // console.log(elementTitle);
                a.setAttribute('download', elementTitle);
                a.href = this.Billpdf;
                a.click();
                this.loader = false;
              } else {
                this.resultMsg = 'Bill invoice successfully downloaded.';
                this.loader = false;
              }
            }, (error) => {
              this.resultMsg = 'Failed to download the bill document.';
            }
          );
          this.isValidFormSubmitted = true;
          this.bill = form.controls['bill'].value;
          this.resetForm(form);
        } else {
          alert('Please fill-in bank details.');
        }
      } else {

        this.email = this.company.email;
        this.loader = true;

        const invoiceDataObj = {
          'companyOid': this.company.oid,
          'generatedDate': this.invoiceData.generatedDate,
          'reference': this.invoiceData.reference,
          'recipientName': this.invoiceData.recipientName,
          'recipientEmail': this.invoiceData.recipientEmail,
          'discountAmt': this.invoiceData.discountAmt,
          'salesTax': this.invoiceData.salesTax,
          'bankName': this.bankname,
          'accountName': this.accountHolder,
          'accountNo': this.accountNo,
          'branchCode': this.branch,
          'actualRecipient': this.email,
          'recipientPhone': this.invoiceData.recipientPhone,
          'recipientAddress': {
            'addresssLine1': this.invoiceData.address.addressLine1,
            'locality': this.invoiceData.address.locality,
            'city': this.invoiceData.address.city,
            'postalCode': this.invoiceData.address.postalCode
          },
          'listOfInvoice': this.invoiceData.listOfInvoice,
          'actionType': 'download',
          'image': this.company.base64Logo
        };

        this.userPortal.downloadQuote(invoiceDataObj, this.userPortalObj.token).subscribe(
          (res) => {
            this.resp = res;
            if (this.resp.fileBytes != null) {
              this.Billpdf = 'data:application/octet-stream;base64,' + this.resp.fileBytes;
              const a = document.createElement('a');
              document.body.appendChild(a);
              a.setAttribute('id', 'qtlink');
              // a.style = "display: none";

              document.getElementById('qtlink').title = this.company.companyName + '-' + this.invoiceData.reference + '.pdf';
              const elementTitle = document.getElementById('qtlink').title;
              a.setAttribute('download', elementTitle);
              a.href = this.Billpdf;
              a.click();
              this.loader = false;
            } else {
              this.resultMsg = 'Bill quote successfully downloaded.';
              this.loader = false;
            }
          }
        );
        this.isValidFormSubmitted = true;
        this.bill = form.controls['bill'].value;
        this.resetForm(form);
      }
    }
  }

  resetForm(form: NgForm) {
    form.resetForm({
      bill: this.invoices
    });
  }
}

