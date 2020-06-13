import { Component, AfterViewInit } from '@angular/core';
import { Bar } from '../bar/bar.model';

@Component({
  selector: 'app-bubblesort',
  templateUrl: './bubblesort.component.html',
  styleUrls: ['./bubblesort.component.scss']
})
export class BubblesortComponent implements AfterViewInit {

  public bars: Bar[] = [];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.bars.push(new Bar());
    }
  }

  ngAfterViewInit() {

  }

}
