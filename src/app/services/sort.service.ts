import { Injectable, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Bar } from '../sorting/bar/bar.model';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  sortEvent = new EventEmitter<boolean>();
  resetEvent = new EventEmitter<any>();

  speedChange$ = new ReplaySubject<number>(1);
  barsChange$ = new ReplaySubject<number>(1);

  bars: Bar[];

  // tslint:disable-next-line: variable-name
  private _sorting = false;

  public get sorting() {
    return this._sorting;
  }
  public set sorting(value) {
    this._sorting = value;
  }

  constructor() {

  }

  sort(): void {
    if (!this.sorting) {
      this.sortEvent.emit(true);
      this.sorting = true;
    }
  }

  reset(): void {
    this.resetEvent.emit();
    this.sorting = false;
  }

  speedChangeEvent(speed: number) {
    this.speedChange$.next(speed);
  }

  barsChangeEvent(bars: number) {
    this.barsChange$.next(bars);
  }
}
