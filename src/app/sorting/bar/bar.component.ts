import { Component, OnInit, Input } from '@angular/core';
import { Bar } from './bar.model';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss']
})
export class BarsComponent implements OnInit {

    @Input()
    bar: Bar;

    barStyle: { background: string; height: string; };

    constructor() {
    }

    ngOnInit() {
        this.barStyle = {
            background: this.bar.color,
            height: `${this.bar.value}%`
        };
    }
}
