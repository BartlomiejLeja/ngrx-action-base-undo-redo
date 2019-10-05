import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { AddProjectPopupComponent } from '../add-project-popup/add-project-popup.component';
import { Project, ProjectState } from '../store/state/project.model';
import { Store } from '@ngrx/store';
import * as projectActions from '../store/project.action';
import { getProjects } from '../store/project.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger)
  public contextMenu: MatMenuTrigger;
  public displayedColumns: string[] = ['projectName', 'numberOfLands', 'profit'];
  public projectCollectionStore : Project[];
  public contextMenuPosition = { x: '0px', y: '0px' };
  private rowIdToEdit: number
  private projectSubscription: Subscription;
 
  constructor(
    public dialog: MatDialog,
    private projectStore: Store<ProjectState>) { }

  ngOnInit() {
    this.projectStore.dispatch(new projectActions.GetProjects() )
    this.projectSubscription = this.projectStore.select(getProjects).subscribe(projects =>
      this.projectCollectionStore = projects
      )
  }

  public onContextMenu(event: MouseEvent, item: Project): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.openMenu();
  }

  public rowEditable(rowNumber: number) : boolean{
    return this.rowIdToEdit === rowNumber;
  }

  public onContextMenuUpdateName(project: Project): void {
    this.rowIdToEdit = project.id;
  }

  public checkEnterKey($event, project: Project): void {
    this.projectStore.dispatch(new projectActions.UpdateProjectName({projectId: project.id, projectName: project.projectName}) )
    this.rowIdToEdit = null;
  }

  public onContextMenuRemoveLand(item: Project): void {
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
      this.projectStore.dispatch(new projectActions.AddProject(project))
    });
  }

   public ngOnDestroy(): void {
    this.projectSubscription .unsubscribe();
 }
}
