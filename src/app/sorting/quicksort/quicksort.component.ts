import { Component, OnInit } from '@angular/core';
import { SnackService } from 'src/app/services/snack.service';
import { SortService } from 'src/app/services/sort.service';
import { Bar } from '../bar/bar.model';
import { AllSorted } from '../allsorted.interface';

@Component({
    selector: 'app-quicksort',
    templateUrl: './quicksort.component.html',
    styleUrls: ['./quicksort.component.scss']
})
export class QuicksortComponent implements OnInit, AllSorted {

    bars: Bar[] = [];
    speed = 0;

    constructor(private snackService: SnackService, private sortService: SortService) {}

    ngOnInit(): void {
        this.reset(this.bars.length);

        this.sortService.barsChange$.subscribe((bars: number) => {
            this.reset(bars);
        });

        this.sortService.speedChange$.subscribe((speed: number) => {
            this.speed = speed;
        });

        this.sortService.sortEvent.subscribe((bool: boolean) => {
            if (bool) {
                const n = this.bars.length;
                this.sort(this.bars, 0, n - 1);
            }
        });

        this.sortService.resetEvent.subscribe(() => {
            this.reset(this.bars.length);
        });
    }

    async partition(arr: Bar[], low: number, high: number) {
        const pivot = arr[high];
        let i = (low - 1);
        for (let j = low; j < high; j++) {
            if (arr[j].value < pivot.value) {
                i++;

                await new Promise(resolve => setTimeout(() => {
                    const temp1 = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp1;
                    resolve();
                }, this.speed));
            }
        }

        await new Promise(resolve => setTimeout(() => {
            const temp2 = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp2;
            resolve();
        }, this.speed));

        return i + 1;
    }

    async sort(arr: Bar[], low, high) {
        if (low < high) {
            const pi = await this.partition(arr, low, high);

            this.sort(arr, low, pi - 1);
            this.sort(arr, pi + 1, high);
        }
    }

    async reset(bars: number) {
        this.bars = [];
        for (let i = 0; i < bars; i++) {
            this.bars.push(new Bar());
        }
    }

    allSorted(bars: Bar[]) {
        for (const bar of bars) {
            bar.sorted = 'final' ;
        }
        this.sortService.sorting = false;
    }
}
