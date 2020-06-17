import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathfindingComponent } from './pathfinding.component';
import { BreadthfirstsearchComponent } from './breadthfirstsearch/breadthfirstsearch.component';


const routes: Routes = [
  { path: '', component: PathfindingComponent},
  { path: 'breadthfirstsearch', component: BreadthfirstsearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathfindingRoutingModule { }
