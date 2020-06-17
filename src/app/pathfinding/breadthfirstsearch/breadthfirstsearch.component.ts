import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadthfirstsearch',
  templateUrl: './breadthfirstsearch.component.html',
  styleUrls: ['./breadthfirstsearch.component.scss']
})
export class BreadthfirstsearchComponent implements OnInit {

  items = new Array(500).fill(0);
  constructor() { }

  ngOnInit(): void {
  }

}
