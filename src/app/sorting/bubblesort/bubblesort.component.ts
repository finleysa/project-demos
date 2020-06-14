import { Component, OnInit } from '@angular/core';
import { Bar } from '../bar/bar.model';
import { SnackService } from 'src/app/services/snack.service';
import { AllSorted } from '../allsorted.interface';
import { SortService } from 'src/app/services/sort.service';

@Component({
    selector: 'app-bubblesort',
    templateUrl: './bubblesort.component.html',
    styleUrls: ['./bubblesort.component.scss']
})
export class BubblesortComponent implements OnInit, AllSorted {

    bars: Bar[] = [];

    constructor(private snackService: SnackService, private sortService: SortService) {}

    ngOnInit(): void {
        for (let i = 0; i < 50; i++) {
            this.bars.push(new Bar());
        }
        this.sortService.sortEvent.subscribe((bool: boolean) => {
            console.log('sort');
            if (bool) {
                this.sort();
            }
        });
    }

    async sort() {
        const startTime = Date.now();

        const n = this.bars.length;
        const iterator = n;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (this.bars[j].value > this.bars[j + 1].value) {
                    await new Promise(resolve => setTimeout(() => {
                        this.swap(this.bars, j, j + 1);
                        resolve();
                    }, 10));
                }
                if (j === n - i - 2) {
                    this.bars[j + 1].sorted = 'initial';
                }
            }
        }
        this.bars[0].sorted = 'initial';

        this.allSorted(this.bars);

        const endTime = Date.now();
        const timePassed = endTime - startTime;

        this.snackService.sorted(timePassed);
    }

    swap(arr: any[], firstIndex: number, secondIndex: number) {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
    }

    allSorted(bars: Bar[]) {
        for (const bar of bars) {
            bar.sorted = 'final' ;
        }
    }
}
