import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BubblesortComponent } from './bubblesort/bubblesort.component';


const routes: Routes = [
  { path: '', component: BubblesortComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortingRoutingModule { }
