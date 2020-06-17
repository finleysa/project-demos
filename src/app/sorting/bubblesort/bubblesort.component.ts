import { Component, OnInit } from '@angular/core';
import { Bar } from '../bar/bar.model';
import { SnackService } from 'src/app/services/snack.service';
import { AllSorted } from '../allsorted.interface';
import { SortService } from 'src/app/services/sort.service';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-bubblesort',
    templateUrl: './bubblesort.component.html',
    styleUrls: ['./bubblesort.component.scss']
})
export class BubblesortComponent implements OnInit, AllSorted {

    bars: Bar[];
    speed = 0;
    cancelSort = false;

    constructor(private snackService: SnackService, private sortService: SortService) { }

    ngOnInit(): void {
        this.sortService.barsChange$.subscribe((bars: number) => {
            this.reset(bars);
        });

        this.sortService.speedChange$.subscribe((speed: number) => {
            this.speed = speed;
        });

        this.sortService.sortEvent.subscribe((bool: boolean) => {
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
}
