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
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './store/project.effects';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './store/project.reducer';

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
    StoreModule.forFeature('project', projectReducer),
    EffectsModule.forFeature([ProjectEffects])
  ],
  entryComponents: [AddProjectPopupComponent],
})
export class ProjectModule { }
