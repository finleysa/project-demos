import { Component, OnInit } from '@angular/core';
import { Bar } from '../bar/bar.model';
import { AllSorted } from '../allsorted.interface';

@Component({
    selector: 'app-mergesort',
    templateUrl: './mergesort.component.html',
    styleUrls: ['./mergesort.component.scss']
})
export class MergesortComponent implements OnInit, AllSorted {
    bars: Bar[];

    constructor() { }

    ngOnInit() {
    }

    merge(arr: Bar[], l: number, m: number, r: number): void {

        const n1 = m - l + 1;
        const n2 = r - m;

        /* Create temp arrays */
        const L = Array[n1];
        const R = Array[n2];

        /*Copy data to temp arrays*/
        for (let i = 0; i < n1; ++i) {
            L[i] = arr[l + i];
        }
        for (let j = 0; j < n2; ++j) {
            R[j] = arr[m + 1 + j];
        }

        /* Merge the temp arrays */

        // Initial indexes of first and second subarrays
        let i = 0;
        let j = 0;

        // Initial index of merged subarry array
        let k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        /* Copy remaining elements of L[] if any */
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
        }

        /* Copy remaining elements of R[] if any */
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    sort(arr: Bar[], l: number, r: number): void {
        if (l < r) {
            // Find the middle point
            const m = (l + r) / 2;

            // Sort first and second halves
            this.sort(arr, l, m);
            this.sort(arr, m + 1, r);

            // Merge the sorted halves
            this.merge(arr, l, m, r);
        }
    }

    allSorted(bars: Bar[]) {
        for (const bar of bars) {
            bar.sorted = 'final' ;
        }
    }
}
