import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-add-project-popup',
  templateUrl: './add-project-popup.component.html',
  styleUrls: ['./add-project-popup.component.css']
})
export class AddProjectPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddProjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project) { }

  ngOnInit() {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
