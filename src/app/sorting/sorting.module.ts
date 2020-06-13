import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortingRoutingModule } from './sorting-routing.module';
import { BubblesortComponent } from './bubblesort/bubblesort.component';
import { SharedModule } from '../shared/shared.module';
import { BarsComponent } from './bar/bar.component';


@NgModule({
  declarations: [BubblesortComponent, BarsComponent],
  imports: [
    CommonModule,
    SortingRoutingModule,
    SharedModule
  ]
})
export class SortingModule { }
