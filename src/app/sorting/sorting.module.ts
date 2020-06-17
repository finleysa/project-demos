import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortingRoutingModule } from './sorting-routing.module';
import { BubblesortComponent } from './bubblesort/bubblesort.component';
import { SharedModule } from '../shared/shared.module';
import { BarsComponent } from './bar/bar.component';
import { InsertionsortComponent } from './insertionsort/insertionsort.component';
import { SortingComponent } from './sorting.component';
import { QuicksortComponent } from './quicksort/quicksort.component';
import { RadixsortComponent } from './radixsort/radixsort.component';


@NgModule({
  declarations: [
    BubblesortComponent,
    BarsComponent,
    InsertionsortComponent,
    SortingComponent,
    QuicksortComponent,
    RadixsortComponent
  ],
  imports: [
    CommonModule,
    SortingRoutingModule,
    SharedModule
  ]
})
export class SortingModule { }
