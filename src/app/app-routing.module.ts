import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandTableComponent } from './land/land-table/land-table.component';
import { ProjectTableComponent } from './project/project-table/project-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'land',
    pathMatch: 'full',
  },
  {
    path: 'land',
    component: LandTableComponent,
  },
  {
    path: 'project',
    component: ProjectTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
