import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onDeactivate() {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
 }
}
