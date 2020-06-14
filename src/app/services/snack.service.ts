import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  sorted(msTime: number) {
    if (!msTime || msTime === 0) { return; }
    const seconds = Math.floor(msTime / 1000);
    this.snackBar.open(`Array sorted in ${seconds} seconds`, null, {
      duration: 3000
    });
  }
}
