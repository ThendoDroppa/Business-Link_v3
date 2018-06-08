import { Injectable } from '@angular/core';

@Injectable()
export class UserLoggInService {

  user:any = {};

   public constructor(){
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    //console.log(this.user);
   }

  isLoggedIn(): boolean {
    //console.log(this.getLoggedInUser());
    if(this.user != null) {
      return true;
    }else{
      return false;
    }
  }

  public getLoggedInUser(){return this.user}

  public clear(): void{
    this.user = null;
    localStorage.clear();
    localStorage.removeItem('userInfo');
  }

  public setUser(user) {
    //console.log(this.user);
    this.user = user;
  }
}