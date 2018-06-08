import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserPortalService } from '../../services/userPortal.service';
import { Company } from '../../models/company';



@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})


export class AddCompanyComponent implements OnInit {

  userPortalObj: any;

  loader: boolean = false;
  directorName: string;
  telephone: string;
  companyName: string;
  addressLine1: string;
  Companyemail :string;
  addressLocality: string;
  addressTown: string;
  postalCode: string;
  companyRegistrationNo: string;
  company: Company;
 
  user: string;
  error: string;
  msg: string;

  constructor(private userPortal: UserPortalService, private route: Router) { }

  ngOnInit() {
  }




  public addNewCompany() {

    this.loader = true;
    this.company = new Company(this.directorName,this.telephone, this.companyName,  this.addressLine1,
      this.addressLocality, this.addressTown,this.postalCode, this.companyRegistrationNo, this.Companyemail);

     this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.userPortalObj);
    console.log(this.company);
    this.userPortal.addNewCompany(this.userPortalObj, this.company).subscribe(
      (res) => {
        console.log(res);
        this.loader = false;
        this.msg = "Company successfully added!";
      },
      (error) => {
        console.log(error);
        this.loader = false;
        this.msg = "Unexpected error occured while adding";
      }
    )


  }

 



}
