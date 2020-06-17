import { Component, OnInit } from '@angular/core';
import { Bar } from '../bar/bar.model';
import { SnackService } from 'src/app/services/snack.service';
import { SortService } from 'src/app/services/sort.service';

@Component({
    selector: 'app-radixsort',
    templateUrl: './radixsort.component.html',
    styleUrls: ['./radixsort.component.scss']
})
export class RadixsortComponent implements OnInit {

    speed: number;
    bars: Bar[];

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
                this.sort(this.bars, this.bars.length);
            }
        });

        this.sortService.resetEvent.subscribe(() => {
            this.reset(this.bars.length);
        });
    }

    getMax(arr: Bar[], n: number): Bar {
        let mx = arr[0];
        for (let i = 1; i < n; i++) {
            if (arr[i].value > mx.value) {
                mx = arr[i];
            }
        }
        return mx;
    }

    countSort(arr: Bar[], n: number, exp: number) {
        const output = Bar[n]; // output array
        let i;
        const count = new Array(10).fill(0);

        for (i = 0; i < n; i++) {
            count[ (arr[i].value / exp) % 10 ]++;
        }

        for (i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (i = n - 1; i >= 0; i--) {
            console.log(output[count[ (arr[i].value / exp) % 10 ] - 1].value, 'OUTPUT');

            // output[count[ (arr[i].value / exp) % 10 ] - 1] = arr[i];
            // count[ (arr[i].value / exp) % 10 ]--;
        }

        for (i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }

    async sort(arr: Bar[], n: number) {
        const m = this.getMax(arr, n);
        for (let exp = 1; m.value / exp > 0; exp *= 10) {
            console.log(arr, n, exp);
            this.countSort(arr, n, exp);
        }
    }

    async reset(bars: number) {
        this.bars = [];
        for (let i = 0; i < bars; i++) {
            this.bars.push(new Bar());
        }
    }
}
