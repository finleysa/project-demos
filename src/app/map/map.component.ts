import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  constructor() { }

  map: any;
  tiles: any;

  ngAfterViewInit(): void {
    this.initMap()
    .then(() => this.initTiles())
    .catch(err => console.error(err));
  }

  private async initMap() {
    this.map = L.map('map').setView([36.1627, -86.7816], 7);
  }
  private async initTiles() {
    this.tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    });
    this.tiles.addTo(this.map);
  }

}
