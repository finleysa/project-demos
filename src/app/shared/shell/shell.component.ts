import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SortService } from 'src/app/services/sort.service';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  barsValue = 25;
  speedValue = 50;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private sortService: SortService) {
    this.sortService.barsChangeEvent(this.barsValue);
    this.sortService.speedChangeEvent(this.speedValue);
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
