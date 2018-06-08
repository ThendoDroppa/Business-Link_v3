import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(private route : Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('userInfo')
    this.route.navigateByUrl('/');
  }
 

}
