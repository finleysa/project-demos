import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackService } from 'src/app/services/snack.service';
import { Bar } from '../bar/bar.model';
import { AllSorted } from '../allsorted.interface';
import { SortService } from 'src/app/services/sort.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
selector: 'app-insertionsort',
templateUrl: './insertionsort.component.html',
styleUrls: ['./insertionsort.component.scss']
})
export class InsertionsortComponent implements OnInit, OnDestroy, AllSorted {

    bars: Bar[] = [];
    speed = 0;
    cancelSort = false;
    private readonly onDestroy = new Subject<void>();

    constructor(private snackService: SnackService, private sortService: SortService) {}

    ngOnInit(): void {
        this.reset(this.bars.length);

        this.sortService.barsChange$.subscribe(bars => {
            this.reset(bars);
        });

        this.sortService.speedChange$.subscribe(speed => {
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
                    }
                });
            }
        });

        this.sortService.resetEvent.subscribe(() => {
            this.reset(this.bars.length);
        });

        this.sortService.cancelSortEvent.subscribe((val: boolean) => {
            this.cancelSort = val;
        });
    }

    async reset(bars: number) {
        this.bars = [];
        for (let i = 0; i < bars; i++) {
            this.bars.push(new Bar());
        }
    }

    async sort() {
        const n = this.bars.length;
        for (let i = 1; i < n; ++i) {
            if (this.cancelSort) { return false; }
            const key = this.bars[i];
            let j = i - 1;

            while (j >= 0 && this.bars[j].value > key.value) {
                await new Promise(resolve => {
                    setTimeout(() => {
                        this.bars[j + 1] = this.bars[j];
                        j = j - 1;
                        resolve();
                    }, this.speed);
                });
            }
            this.bars[j + 1] = key;
        }
        return true;
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
