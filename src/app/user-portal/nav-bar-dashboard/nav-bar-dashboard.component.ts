import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar-dashboard',
  templateUrl: './nav-bar-dashboard.component.html',
  styleUrls: ['./nav-bar-dashboard.component.css']
})
export class NavBarDashboardComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.route.navigateByUrl('/');
  }
}
