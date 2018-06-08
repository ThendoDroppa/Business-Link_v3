import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SharedService{
  username;
  totalAmt : number;
  //serverUrl : string = "https://www.droppa.co.za/droppa/services/";
  //serverUrl : string = "http://localhost:8080/droppa/services/";
  serverUrl : string = "http://88.99.94.84:8180/invoice/services/";
  constructor(private http : HttpClient){
     this.username = '';
     this.totalAmt = 0.0;
  }

  public setName(name : string) {
      this.username = name;
  }

  public setTotalAmount(price : number){
      this.totalAmt = price;
  }

  public getUrl():string {
      return this.serverUrl;
  }
  public getTotalAmt() : number {
      return this.totalAmt;
  }
  public getName() : string {
      return this.username;
  }

  public sendContactUs(userData) {
    return this.http.post(this.getUrl()+"parties/contactUs",userData, 
    {headers: new HttpHeaders().set("Accept", 'application/json').set('Content-Type', 'application/json')});
  }
}