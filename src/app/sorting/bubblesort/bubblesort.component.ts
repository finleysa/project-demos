import { Component, OnInit } from '@angular/core';
import { Bar } from '../bar/bar.model';
import { SnackService } from 'src/app/services/snack.service';

@Component({
selector: 'app-bubblesort',
templateUrl: './bubblesort.component.html',
styleUrls: ['./bubblesort.component.scss']
})
export class BubblesortComponent implements OnInit {

    bars: Bar[] = [];

    constructor(private snackService: SnackService) {}

    ngOnInit(): void {
        for (let i = 0; i < 50; i++) {
        this.bars.push(new Bar());
        }
        this.sort();
    }

    async sort() {
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
                    this.bars[j + 1].barStyle.background = 'green';
                }
            }
        }
        this.bars[0].barStyle.background = 'green';
        this.snackService.sorted();
    }

    swap(arr: any[], firstIndex: number, secondIndex: number) {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
    }
}
