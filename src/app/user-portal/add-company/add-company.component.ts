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

  loader = false;
  directorName: string;
  telephone: string;
  companyName: string;
  addressLine1: string;
  Companyemail: string;
  addressLocality: string;
  addressTown: string;
  postalCode: string;
  companyRegistrationNo: string;
  company: Company;

  user: string;
  error: string;
  msg: string;
  userToken: any;
  fileSize: any;
  base64DISC: string;
  image: string = null;
  avator = 'assets\\home\\userProfile.png';
  file: any;

  constructor(private userPortal: UserPortalService, private route: Router) { }

  ngOnInit() {
    this.userToken = JSON.parse(localStorage.getItem('userInfo')).token;
  }

  public addNewCompany() {
    this.loader = true;
    this.company = new Company(this.directorName, this.telephone, this.companyName, this.addressLine1,
    this.addressLocality, this.addressTown, this.postalCode, this.companyRegistrationNo, this.base64DISC, this.Companyemail);
    this.userPortalObj = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.base64DISC);
    console.log(this.userPortalObj);
    console.log(this.company);
    this.userPortal.addNewCompany(this.userPortalObj, this.company).subscribe(
      (res) => {
        console.log(res);
        this.loader = false;
        this.msg = 'Company successfully added!';
        window.alert(this.msg);
        this.route.navigateByUrl('/dashboard');
      },
      (error) => {
        console.log(error);
        this.loader = false;
        this.msg = 'Unexpected error occured while adding';
      }
    );
  }

  onFileChange(event) {
    const binaryString = event.target.result;
    this.base64DISC = btoa(binaryString);
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();
      reader.onload = this.onFileChange.bind(this);
      reader.readAsBinaryString(file);
      this.fileSize = file.size; // size in kb
      this.fileSize = this.fileSize / 1048576; // size in mb
    }
  }

  public onUploadPic() {
    const picture = {
      'base64Image': this.base64DISC,
      'personId': JSON.parse(localStorage.getItem('userInfo')).owner.oid,
    };
    console.log(JSON.parse(localStorage.getItem('userInfo')).owner.oid);
    console.log({picture});
    if (this.base64DISC != null) {
      if (this.fileSize < 1) {
        this.loader = true;
        this.userPortal.uploadProfilePic(picture, this.userToken).subscribe(
          (data) => {
            this.loader = false;
            window.alert('Image successfuly uploaded!');
          }, (error) => {
            this.loader = false;
            window.alert('Error occured, image not uploaded!');
          }
        );
      } else {
        window.alert('Image too large');
      }
    } else {
      window.alert('Error occured, Please select image');
    }
  }
}
