import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackService } from 'src/app/services/snack.service';
import { SortService } from 'src/app/services/sort.service';
import { Bar } from '../bar/bar.model';
import { ISortComponent } from '../sorting.interface';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-quicksort',
    templateUrl: './quicksort.component.html',
    styleUrls: ['./quicksort.component.scss']
})
export class QuicksortComponent implements OnInit, OnDestroy, ISortComponent {

    bars: Bar[] = [];
    speed = 0;
    cancelSort = false;
    readonly onDestroy = new Subject<void>();

    constructor(private snackService: SnackService, private sortService: SortService) {}

    ngOnInit(): void {
        this.sortSubscriptions();
    }

    async sortSubscriptions() {
        this.sortService.barsChange$
        .pipe(
            debounceTime(250),
            takeUntil(this.onDestroy)
        )
        .subscribe(num => {
            this.reset(num);
        });

        this.sortService.speedChange$
        .pipe(takeUntil(this.onDestroy))
        .subscribe(speed => {
            this.speed = speed;
        });

        this.sortService.sortEvent
        .pipe(takeUntil(this.onDestroy))
        .subscribe((bool: boolean) => {
            if (bool) {
                const startTime = Date.now();
                const n = this.bars.length;
                this.sort(this.bars, 0, n - 1)
                .then((val: boolean) => {
                    if (val) {
                        this.allSorted(this.bars);
                        this.snackService.sorted(Date.now() - startTime);
                    } else {
                        this.snackService.sorted(null);
                    }
                });
            }
        });

        this.sortService.resetEvent
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
            this.reset(this.bars.length);
        });

        this.sortService.cancelSortEvent
        .pipe(takeUntil(this.onDestroy))
        .subscribe((val: boolean) => {
            this.cancelSort = val;
        });
    }

    async partition(arr: Bar[], low: number, high: number) {
        const pivot = arr[high];

        let i = (low - 1);
        for (let j = low; j <= high - 1; j++) {

            if (arr[j].value <= pivot.value) {
                i++;

                await new Promise(resolve => setTimeout(() => {
                    const tempOne = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tempOne;
                    resolve();
                }, this.speed));
            }
        }

        const tempTwo = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = tempTwo;

        return i + 1;
    }

    async sort(arr: Bar[], l: number, h: number) {
        const stack = new Array<number>(h - l + 1);

        let top = -1;

        stack[++top] = l;
        stack[++top] = h;

        while (top >= 0) {
            if (this.cancelSort) { return false; }
            h = stack[top--];
            l = stack[top--];

            const p = await this.partition(arr, l, h);

            if (p - 1 > l) {
                stack[++top] = l;
                stack[++top] = p - 1;
            }

            if (p + 1 < h) {
                stack[++top] = p + 1;
                stack[++top] = h;
            }
        }

        return true;
    }

    async reset(bars: number) {
        this.bars = [];
        for (let i = 0; i < bars; i++) {
            this.bars.push(new Bar());
        }
    }

    allSorted(bars: Bar[]) {
        for (const bar of bars) {
            bar.sortedCondition = 'final' ;
        }
        this.sortService.sorting = false;
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
    }
}
