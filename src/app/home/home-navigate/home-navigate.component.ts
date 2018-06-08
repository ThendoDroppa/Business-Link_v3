import { Component, OnInit } from '@angular/core';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home-navigate',
  templateUrl: './home-navigate.component.html',
  styleUrls: ['./home-navigate.component.css']
})
export class HomeNavigateComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  onDeactivate() {
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
 }

}
