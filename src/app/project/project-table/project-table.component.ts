import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { AddProjectPopupComponent } from '../add-project-popup/add-project-popup.component';
import { Project, ProjectState } from '../store/state/project.model';
import { Store } from '@ngrx/store';
import * as projectActions from '../store/project.action';
import { getProjects } from '../store/project.reducer';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  public displayedColumns: string[] = ['projectName', 'numberOfLands', 'profit'];
  public projects$: Observable<Project[]>;
  public projects: Project[];
  private rowIdToEdit: number
  public projectCollectionStore : Project[];

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: Project) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.openMenu();
  }

  rowEditable(item: number) : boolean{
    return this.rowIdToEdit === item;
  }
  constructor(
    public dialog: MatDialog,
    private projectStore: Store<ProjectState>, ) { }

  ngOnInit() {
    this.projectStore.dispatch(new projectActions.GetProjects() )
    this.projectStore.select(getProjects).subscribe(p =>
      this.projectCollectionStore = p
      )
  }

  onContextMenuUpdateName(item: Project) {
    this.rowIdToEdit = item.id;
  }

  checkEnterKey($event, project: Project){
    this.projectStore.dispatch(new projectActions.UpdateProjectName({projectId: project.id, projectName: project.projectName}) )
    this.rowIdToEdit = null;
  }

  onContextMenuRemoveLand(item: Project) {
    this.projectStore.dispatch(new projectActions.RemoveProject(item.id))

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectPopupComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: Project) => {
      console.log('The dialog was closed');
      console.log(result);
      let project = result as Project 
      project.id = this.projectCollectionStore.length;
      project.numberOfLands = +result.numberOfLands;
      project.profit = +result.profit;
      //this.projectService.add(project)
      this.projectStore.dispatch(new projectActions.AddProject(project))
    });
  }

}
