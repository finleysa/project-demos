import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BubblesortComponent } from './bubblesort/bubblesort.component';
import { InsertionsortComponent } from './insertionsort/insertionsort.component';


const routes: Routes = [
  { path: 'bubblesort', component: BubblesortComponent },
  { path: 'insertionsort', component: InsertionsortComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortingRoutingModule { }
