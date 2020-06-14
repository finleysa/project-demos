import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  sortEvent = new EventEmitter<boolean>();

  constructor() { }

  sort(): void {
    this.sortEvent.emit(true);
  }
}
