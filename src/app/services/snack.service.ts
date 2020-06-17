import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  sorted(msTime?: number) {
    if (msTime) {
      const seconds = Math.floor(msTime / 1000);
      this.snackBar.open(`Array sorted in ${seconds} seconds`, null, {
        duration: 3000
      });
    } else {
      this.snackBar.open('Sort Canceled', null, {
        duration: 3000
      });
    }
  }
}
