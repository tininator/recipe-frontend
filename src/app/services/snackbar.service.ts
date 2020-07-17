import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../core/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {}

  public openSnackBar(title: string): MatSnackBarRef<SnackbarComponent> {
    return this._snackBar.openFromComponent(SnackbarComponent, {
      data: title,
      duration: 5000,
    });
  }
}
