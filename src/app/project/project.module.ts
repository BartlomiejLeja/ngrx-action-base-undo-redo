import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTableComponent } from './project-table/project-table.component';
import { AddProjectPopupComponent } from './add-project-popup/add-project-popup.component';
import { FormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatMenuModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule
  } from '@angular/material';

@NgModule({
  declarations: [ProjectTableComponent, AddProjectPopupComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  entryComponents: [AddProjectPopupComponent],
})
export class ProjectModule { }
