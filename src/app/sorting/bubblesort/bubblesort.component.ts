import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubblesort',
  templateUrl: './bubblesort.component.html',
  styleUrls: ['./bubblesort.component.scss']
})
export class BubblesortComponent implements OnInit {

  public bars = Array(10).fill(null);

  constructor() { }

  ngOnInit() {
  }

}
