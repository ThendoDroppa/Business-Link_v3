import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  user :any;
  fullName;
  userPortalObj : any;
  companies : any = [];
  txt : string = "";
  //btnText: string = "Unknown"

  constructor(private admin : AdminService) { 
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userPortalObj =  JSON.parse(localStorage.getItem('userInfo'));
    this.fullName = this.user.owner.surname + " "+this.user.owner.firstName;
  }

  ngOnInit() {
 
    this.admin.getAllUserCompanies(this.userPortalObj.token, this.user.owner.oid).subscribe(
      (res) => {
        this.companies = res;
      }
    )
  }

  public btnText(status){
		var btnText = "Unknown Status";
		if(status === "ACTIVE"){
			btnText = "Block"
		}else if(status === "SUSPENDED"){
			btnText = "Activate"
		}
		return btnText;
  }
  
  public changeStatus() {
    if(this.user.status === "ACTIVE"){
      
      this.admin.block(this.userPortalObj.token, this.user.owner.email).subscribe(
        (res) => {
          this.txt = "User is successfully blocked";
        }
      );

		}else if(this.user.status === "SUSPENDED"){
      this.admin.activate(this.userPortalObj.token, this.user.owner.email).subscribe(
        (res) => {
          this.txt = "User is successfully activated";
        }
      );
      
		}else {
      alert("User's account not active.");
    }
  }

}
