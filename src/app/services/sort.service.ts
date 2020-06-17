import { Injectable, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Bar } from '../sorting/bar/bar.model';

@Injectable({
providedIn: 'root'
})
export class SortService {

    sortEvent = new EventEmitter<boolean>();
    resetEvent = new EventEmitter<any>();
    cancelSortEvent = new EventEmitter<boolean>();

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
        this.cancelSort(false);
        this.sortEvent.emit(true);
    }

    reset(): void {
        this.resetEvent.emit();
        this.cancelSort(true);
        this.sorting = false;
    }

    speedChangeEvent(speed: number) {
        this.speedChange$.next(speed);
    }

    barsChangeEvent(bars: number) {
        this.cancelSort(true);
        this.barsChange$.next(bars);
    }

    private cancelSort(val: boolean): void {
        this.cancelSortEvent.emit(val);
    }
}
