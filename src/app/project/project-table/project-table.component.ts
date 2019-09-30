import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { AddProjectPopupComponent } from '../add-project-popup/add-project-popup.component';

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
  constructor(private projectService: ProjectService, public dialog: MatDialog) { }

  ngOnInit() {
    this.projects$ = this.projectService.entities$;
    this.projectService.getAll().subscribe((p)=>{
      this.projects = p;
    }); 
  }

  onContextMenuUpdateName(item: Project) {
    this.rowIdToEdit = item.id;
  }

  checkEnterKey($event, item: Project){
    //this.landService.updateLandName(item.id, item.landName).subscribe();
    // this.landStore.dispatch(new landActions.UpdateLandName({landId: item.id, landName: item.landName}) )
    this.projectService.update(item);
    this.rowIdToEdit = null;
  }

  onContextMenuRemoveLand(item: Project) {
    this.projectService.delete(item, {tag: 'Undo delete'});

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
      project.id = this.projects.length;
      project.numberOfLands = +result.numberOfLands;
      project.profit = +result.profit;
      this.projectService.add(project)
    });
  }

}
