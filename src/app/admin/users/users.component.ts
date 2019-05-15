import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: any;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }


  ngOnInit() {
  }

}
