import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map.component';
import { AppComponent } from '../app.component';


const routes: Routes = [
  { path: '', component: MapComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
