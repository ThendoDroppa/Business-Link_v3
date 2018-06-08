import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './../services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;
  msgBody: string;
  name: string;
  msgStatus: string = '';
  
  constructor(private router : Router, private shared : SharedService) { 

    
  }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.email);

    var data = {
      "email" : this.email,
      "name" : this.name,
      "comments" : this.msgBody
    }
 
    this.shared.sendContactUs(data)
    .subscribe(
      (res) => {
        console.log(res + "test");
        window.alert("Message sent..");
        this.msgStatus = 'Your message has been sent.';
      },
      (err) => {
        console.log(err);
        this.msgStatus = 'Error occured, please verify your inputs.';
      }
    )

    
  }



}
