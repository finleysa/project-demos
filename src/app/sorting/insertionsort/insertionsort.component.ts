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
    speed = 0;

    constructor(private snackService: SnackService, private sortService: SortService) {}

    ngOnInit() {
        this.sortService.barsChange$.subscribe(bars => {
            this.bars = [];
            for (let i = 0; i < bars; i++) {
                this.bars.push(new Bar());
            }
        });

        this.sortService.speedChange$.subscribe(speed => {
            this.speed = speed;
        });

        this.sortService.sortEvent.subscribe((bool: boolean) => {
            if (bool) {
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
                    }, this.speed);
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