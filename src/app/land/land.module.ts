import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandTableComponent } from './land-table/land-table.component';
import {
MatTableModule,
MatMenuModule,
MatInputModule,
MatButtonModule,
MatDialogModule,
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { landReducer } from './store/land.reducer';
import { LandEffects } from './store/land.effects';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AddLandPopupComponent } from './add-land-popup/add-land-popup.component';

@NgModule({
  declarations: [LandTableComponent, AddLandPopupComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forFeature('land', landReducer),
    EffectsModule.forFeature([LandEffects])
  ],
  exports: [
  ],
  entryComponents: [AddLandPopupComponent],
})
export class LandModule { }
