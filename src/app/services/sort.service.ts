import { Injectable, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Bar } from '../sorting/bar/bar.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  sortEvent = new EventEmitter<boolean>();
  speedChange$ = new ReplaySubject<number>(1);
  barsChange$ = new ReplaySubject<number>(1);
  bars: Bar[];

  constructor() {

  }

  sort(): void {
    this.sortEvent.emit(true);
  }

  speedChangeEvent(speed: number) {
    this.speedChange$.next(speed);
  }

  barsChangeEvent(bars: number) {
    this.barsChange$.next(bars);
  }
}
