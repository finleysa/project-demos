import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bar } from '../bar/bar.model';
import { SnackService } from 'src/app/services/snack.service';
import { SortService } from 'src/app/services/sort.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ISortComponent } from '../sorting.interface';

@Component({
    selector: 'app-bubblesort',
    templateUrl: './bubblesort.component.html',
    styleUrls: ['./bubblesort.component.scss']
})
export class BubblesortComponent implements OnInit, OnDestroy, ISortComponent {

    bars: Bar[];
    speed = 0;
    cancelSort = false;
    readonly onDestroy = new Subject<void>();

    constructor(private snackService: SnackService, private sortService: SortService) { }

    ngOnInit(): void {
        this.sortSubscriptions();
    }

    async sortSubscriptions() {
        this.sortService.barsChange$
        .pipe(takeUntil(this.onDestroy))
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
                this.sort()
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

    async reset(num: number) {
        this.bars = [];
        for (let i = 0; i < num; i++) {
            this.bars.push(new Bar());
        }
    }

    async sort() {
        const n = this.bars.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.cancelSort) { return false; }
                if (this.bars[j].value > this.bars[j + 1].value) {
                    await new Promise(resolve => setTimeout(() => {
                        this.swap(this.bars, j, j + 1);
                        resolve();
                    }, this.speed));
                }
                if (j === n - i - 2) {
                    this.bars[j + 1].sortedCondition = 'initial';
                }
            }
        }
        this.bars[0].sortedCondition = 'initial';

        return true;
    }

    swap(arr: any[], firstIndex: number, secondIndex: number) {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
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
