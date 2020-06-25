import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSliderChange } from '@angular/material/slider';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
    link: string;

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
            if (nav.url !== '/') {
                this.link = '';
            } else {
                this.link = nav.url;
                this.sortService.reset();
            }
            const splitUrl = nav.url.split('/');
            const path = splitUrl[splitUrl.length - 1];
            this.title = this.findTitle(path);
        });
    }

    findTitle(path: string): string {
        switch (path) {
            // SORTING
            case 'sorting':
                return 'Sorting';
            case 'bubblesort':
                return 'Bubble Sort';
            case 'quicksort':
                return 'Quicksort';
            case 'insertionsort':
                return 'Insertion Sort';
            // PATHFINDING
            case 'pathfinding':
                return 'Pathfinding';
            // Map
            case 'map':
                return 'Leaflet Map';
            default:
                return 'My Portfolio';
        }
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

    get notHomePath() {
        console.log(this.link);
        return this.link !== '/';
    }
}
