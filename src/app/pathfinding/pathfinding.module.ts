import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PathfindingRoutingModule } from './pathfinding-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PathfindingComponent } from './pathfinding.component';
import { BreadthfirstsearchComponent } from './breadthfirstsearch/breadthfirstsearch.component';


@NgModule({
  declarations: [PathfindingComponent, BreadthfirstsearchComponent],
  imports: [
    CommonModule,
    PathfindingRoutingModule,
    SharedModule
  ]
})
export class PathfindingModule { }
