import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Item } from '../land-table/land-table.component';

@Component({
  selector: 'app-add-land-popup',
  templateUrl: './add-land-popup.component.html',
  styleUrls: ['./add-land-popup.component.css']
})
export class AddLandPopupComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddLandPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Item) { }

  ngOnInit() {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
