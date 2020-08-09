import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { statesData } from './us-states';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

    constructor() { }

    map: any;
    tiles: any;
    mapboxAccessToken = "environment.mapboxConfig.apiKey";

    ngAfterViewInit(): void {
        this.initMap()
        .then(() => this.initTiles())
        .then(() => this.addGeoJsonData(statesData) )
        .catch(err => console.error(err));
    }

    private async initMap() {
        this.map = L.map('map').setView([37.8, -96], 4);
    }
    private async initTiles() {
        this.tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
        this.mapboxAccessToken, {
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
        });
        this.tiles.addTo(this.map);
    }

    private async addGeoJsonData(data)  {
        L.geoJSON(data, { style: this.style.bind(this) }).addTo(this.map);
    }

    private style(feature) {
        return {
            fillColor: this.getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    private getColor(d: number): string {
        return d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
            d > 100  ? '#FC4E2A' :
            d > 50   ? '#FD8D3C' :
            d > 20   ? '#FEB24C' :
            d > 10   ? '#FED976' :
                        '#FFEDA0';
    }
}
