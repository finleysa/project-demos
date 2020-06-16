import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSliderChange } from '@angular/material/slider';

import { Observable, Subject } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { SortService } from 'src/app/services/sort.service';
import { RoutingService } from 'src/app/services/routing.service';
import { NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

    barsValue = 25;
    speedValue = 50;

    isSortUrl = false;
    title: string;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private sortService: SortService,
        private routerService: RoutingService) {

        this.sortService.barsChangeEvent(this.barsValue);
        this.sortService.speedChangeEvent(this.speedValue);
    }

    ngOnInit() {
        this.routerService.navEnd.subscribe((nav: NavigationEnd) => {
            this.isSortUrl = nav.url.includes('sorting');
            this.title = this.isSortUrl ? 'Sorting Examples' : 'My Portfolio';
        });
    }

    sort() {
        this.sortService.sort();
    }

    reset() {
        this.sortService.reset();
    }

    barsValueChanged(event: MatSliderChange) {
        this.sortService.barsChangeEvent(event.value);
    }

    speedValueChanged(event: MatSliderChange) {
        this.sortService.speedChangeEvent(event.value);
    }
}
