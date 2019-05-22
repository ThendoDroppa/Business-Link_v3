import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPortalService } from '../../services/userPortal.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  company: any;
  receipentName: string;
  email: string;
  phone: string;
  ref: string;
  address: string;
  addressLocalty: string;
  addressCity: string;
  addressCode: string;
  description: string;
  qty: number;
  list: any = [];
  invoice: any;
  quote: any;
  tax: number;
  // check: any;
  userPortalObj: any;
  item: any;
  total: any;
  discount: number; 8
  price: number;
  invoiceData: any;
  loader: any;
  msg: any;
  listOfInvoice: any;
  subTotal = 0.0;
  myTotal = 0.0;
  tempTaxAmt = 0.0;
  tempTotal = 0.0;
  totalAmtToDiscount = 0.0;

  today: any;
  dd: any;
  mm: any;
  discountValue: number;
  vatValue: number;

  constructor(private userPortal: UserPortalService, private route: Router) { }

  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('CompanyQuote'));
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.company);
  }

  public reviewInvoice(company) {
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth() + 1;

    const yyyy = this.today.getFullYear();
    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }
    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }

    this.today = this.dd + '/' + this.mm + '/' + yyyy;
    this.vatValue = (this.tax == null) ? 0.0 : this.tax;
    this.discountValue = (this.discount == null) ? 0.0 : this.discount;

    this.listOfInvoice = this.list;
    const addr = {
      'addressLine1': this.address,
      'locality': this.addressLocalty,
      'city': this.addressCity,
      'postalCode': this.addressCode
    };

    const invoiceData = {
      'companyOid': this.company.oid,
      'generatedDate': this.today,
      'reference': this.ref,
      'recipientName': this.receipentName,
      'recipientEmail': this.email,
      'discountAmt': this.discountValue,
      'salesTax': this.vatValue,
      'actualRecipient': this.email,
      'documentType': null,
      'recipientPhone': this.phone,
      'recipientAddress': addr,
      'listOfInvoice': this.list,
      'address':
      {
        'addressLine1': this.address,
        'locality': this.addressLocalty,
        'city': this.addressCity,
        'postalCode': this.addressCode
      }
    };

    console.log(invoiceData.listOfInvoice);

    if (invoiceData.listOfInvoice.length !== 0) {
      this.loader = false;
      console.log(invoiceData);
      localStorage.setItem('data', JSON.stringify(invoiceData));
      this.route.navigateByUrl('/review');
    } else {
      this.loader = false;
      this.msg = 'Please enter the items.';
      alert('Please enter the items.');
    }
  }

  public delete(item, index) {
    if (this.check(item.description)) {
      this.list.splice(index, 1);
      if (this.check(item.description)) {
        this.total = 0.0;
        if (this.discount > 0) {
          const currentTotal = (((this.tax / 100) * this.totalAmont()) + this.totalAmont());
          this.total = currentTotal - this.discount;
        } else {
          const currentTotal = (((this.tax / 100) * this.totalAmont()) + this.totalAmont());
          this.total = currentTotal;
        }
      } else {
        this.total = 0.0;
        if (this.discount > 0) {
          this.total = this.totalAmont() - this.discount;
        } else {
          this.total = this.totalAmont();
        }
      }
    }
  }

  public totalAmont() {
    // tslint:disable-next-line: indent
    let totalPrice = 0.0;
    for (let i = 0; i < this.list.length; i++) {
      totalPrice = totalPrice + (this.list[i].price * this.list[i].quantity);
    }
    return totalPrice;
    // tslint:disable-next-line: indent
  }

  public totalPrice(list) {
    let totalPrice = 0.0;
    for (let i = 0; i < list.length; i++) {
      totalPrice = totalPrice + (list[i].price * list[i].quantity);
    }
    return totalPrice;
  }

  public addItem() {
    if (this.list.length === 10) {
      alert('You can only add 10 items.');
      return;
    }
    if (this.check(this.description)) {
      this.msg = 'Opps, the item description already exists';
      alert(this.msg);
      return;
    }

    this.list.push(this.item = {
      description: this.description, price: Math.round(this.price),
      quantity: this.qty
    });

    this.subTotal = Math.round(this.price) * this.qty;
    this.total = this.totalAmont();
    this.myTotal = this.totalAmont();

    this.tempTotal = this.myTotal;
    this.tempTaxAmt = this.total;
    // $scope.totalAmtToAdd = $scope.myTotal + $scope.subTotal;

    this.totalAmtToDiscount = this.total + this.subTotal;

    if (this.tax > 0) {
      this.total = 0.0;
      this.total = ((this.tax / 100) * this.myTotal) + this.myTotal;
      // ((($scope.tax/100)*$scope.tempTotal)+$scope.tempTotal)
    }

    if (this.discount > 0) {
      if (this.tax > 0) {
        this.total = this.total - this.discount;
      } else {
        this.total = this.tempTotal - this.discount;
      }
    }

    this.description = '';
    this.price = 0;
    this.qty = 0;

    document.getElementById('description').focus();

    this.subTotal = 0.0;
  }

  public check(object) {
    let value = false;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].description === object) {
        value = true;
        break;
      }
    }
    return value;
    // tslint:disable-next-line: indent
  }

  // $scope.amtTax = 0.0;
  public onTaxChange(value) {
    if (isNaN(value) === false) {
      this.total = 0;

      if (value > 0) {
        if (this.discount > 0) {
          this.total = (((value / 100) * this.totalAmont()) + this.totalAmont()) - (this.discount);
          this.tempTaxAmt = this.total;
        } else {
          this.total = ((value / 100) * this.totalAmont()) + this.totalAmont();
          this.tempTaxAmt = this.total;
        }
      } else {
        this.total = ((value / 100) * this.totalAmont()) + this.totalAmont();
        this.tempTaxAmt = this.total;
      }
    } else {
      if (this.discount > 0) {
        this.total = (this.totalAmont()) - (this.discount);
        this.tempTaxAmt = this.totalAmont() - this.discount;
      } else {
        this.total = this.totalAmont();
        this.tempTaxAmt = this.totalAmont();
      }
    }
  }

  onDiscountChange(value) {
    if (isNaN(value) === false) {
      if (value > 0) {
        if (this.tax > 0) {
          this.total = (((this.tax / 100) * this.totalAmont()) + this.totalAmont()) - value;
        } else {
          this.total = this.totalAmont() - value;
        }
      } else {
        this.total = this.totalAmont();
      }
    } else {
      if (this.tax > 0) {
        this.total = (((this.tax / 100) * this.totalAmont()) + this.totalAmont());
        // console.log(this.total);
      } else {
        this.total = this.totalAmont();
      }
    }
  }
}
