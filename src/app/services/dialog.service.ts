import { Injectable } from '@angular/core';
import { DialogComponent } from '../core/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  openDialog(message: string): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: '500px',
      data: message
    });
  }
}
