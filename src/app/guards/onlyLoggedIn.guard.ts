import { Injectable } from '@angular/core'
import { UserLoggInService } from '../services/loggedInUser.service';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserLoggInService, private route : Router) {
  };

  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      //logon
      this.route.navigateByUrl('/login');
      return false;
    }
  }
}