import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BubblesortComponent } from './bubblesort/bubblesort.component';
import { InsertionsortComponent } from './insertionsort/insertionsort.component';
import { SortingComponent } from './sorting.component';
import { HomeComponent } from '../home/home.component';
import { QuicksortComponent } from './quicksort/quicksort.component';
import { RadixsortComponent } from './radixsort/radixsort.component';


const routes: Routes = [
  { path: '', component: SortingComponent},
  { path: 'bubblesort', component: BubblesortComponent },
  { path: 'insertionsort', component: InsertionsortComponent },
  { path: 'quicksort', component: QuicksortComponent },
  { path: 'radixsort', component: RadixsortComponent },
  { path: '**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortingRoutingModule { }
