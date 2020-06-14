import { Component, OnInit } from '@angular/core';
import { SnackService } from 'src/app/services/snack.service';
import { Bar } from '../bar/bar.model';
import { promise } from 'protractor';
import { AllSorted } from '../allsorted.interface';
import { SortService } from 'src/app/services/sort.service';

@Component({
selector: 'app-insertionsort',
templateUrl: './insertionsort.component.html',
styleUrls: ['./insertionsort.component.scss']
})
export class InsertionsortComponent implements OnInit, AllSorted {

    bars: Bar[] = [];

    constructor(private snackService: SnackService, private sortService: SortService) {}

    ngOnInit() {
        for (let i = 0; i < 50; i++) {
            this.bars.push(new Bar());
        }
        this.sortService.sortEvent.subscribe((val: boolean) => {
            if (val) {
                this.sort();
            }
        });
    }

    async sort() {
        const startTime = Date.now();

        const n = this.bars.length;
        for (let i = 1; i < n; ++i) {
            const key = this.bars[i];
            let j = i - 1;

            while (j >= 0 && this.bars[j].value > key.value) {
                await new Promise(resolve => {
                    setTimeout(() => {
                        this.bars[j + 1] = this.bars[j];
                        j = j - 1;
                        resolve();
                    }, 100);
                });
            }
            this.bars[j + 1] = key;
        }

        this.allSorted(this.bars);

        const endTime = Date.now();
        const timePassed = endTime - startTime;

        this.snackService.sorted(timePassed);
    }

    allSorted(bars: Bar[]) {
        for (const bar of bars) {
            bar.sorted = 'final' ;
        }
    }
}
