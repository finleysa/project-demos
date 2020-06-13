import { Component, ElementRef, AfterViewInit, Directive, OnInit } from '@angular/core';

@Component({
    selector: 'app-bar',
    templateUrl: './bars.component.html',
    styleUrls: ['./bars.component.scss']
})
export class BarsComponent implements OnInit {
    value: number = Math.floor(Math.random() * 99) + 1;
    color: string = null;
    barStyle: { 'background-color': string; height: string; };

    constructor(public eRef: ElementRef) {

    }

    ngOnInit() {
        this.barStyle = {
            'background-color': this.generateRandomColor(),
            height: `${this.value}%`
        };
    }

    generateRandomColor() {
        this.color = ('#' + Math.floor(Math.random() * 16777215).toString(16));
        return this.color;
    }

}
