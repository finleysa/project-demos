import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathfindingComponent } from './pathfinding.component';


const routes: Routes = [
  { path: '', component: PathfindingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathfindingRoutingModule { }
