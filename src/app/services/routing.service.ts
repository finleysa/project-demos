import { Injectable } from '@angular/core';
import { UrlSegment, Router, NavigationEnd, Navigation } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  navEnd = new ReplaySubject<NavigationEnd>(1);

  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.navEnd.next(val);
      }
    });
  }
}
