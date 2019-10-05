import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../store/state/project.model';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-project-popup',
  templateUrl: './add-project-popup.component.html',
  styleUrls: ['./add-project-popup.component.css']
})
export class AddProjectPopupComponent implements OnInit {
  public projectName = new FormControl('', [Validators.required]);
  public projectNumberOfLands = new FormControl('', [Validators.required]);
  public projectProfit = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project) { }

  
  ngOnInit() {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
