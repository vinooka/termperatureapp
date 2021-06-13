import { Component, OnInit } from '@angular/core';
import { locationList } from '../app.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cities = locationList;

  constructor( ) { }

  ngOnInit(): void {
    
  }

}
