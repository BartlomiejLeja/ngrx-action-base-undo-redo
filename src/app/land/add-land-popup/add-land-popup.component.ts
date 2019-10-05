import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Land } from '../store/state/land.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-land-popup',
  templateUrl: './add-land-popup.component.html',
  styleUrls: ['./add-land-popup.component.css']
})
export class AddLandPopupComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddLandPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Land) { }

  ngOnInit() {
  }

  landName = new FormControl('', [Validators.required]);
  landAdress = new FormControl('', [Validators.required]);
  landArea = new FormControl('', [Validators.required]);

  public onNoClick(): void {
    // this.landAddFormGroup.
      this.dialogRef.close();
  }
}
