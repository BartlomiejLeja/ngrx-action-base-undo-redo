import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { LandState, Land } from '../store/state/land.model';
import * as landActions from '../store/land.action';
import { AddLandPopupComponent } from '../add-land-popup/add-land-popup.component';
import * as _ from 'lodash';
import { getlands } from '../store/land.selector';

@Component({
  selector: 'app-land-table',
  templateUrl: './land-table.component.html',
  styleUrls: ['./land-table.component.css']
})
export class LandTableComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  public contextMenu: MatMenuTrigger;
  public landCollectionStore : Land[];
  public displayedColumns: string[] = ['landName', 'adress', 'areaInHektars'];
  private rowIdToEdit: number
  private contextMenuPosition = { x: '0px', y: '0px' };

  constructor (
    private landStore: Store<LandState>, 
    public dialog: MatDialog){}

  public ngOnInit() :void{
    this.landStore.dispatch(new landActions.GetLands() )
    this.landStore.select(getlands).subscribe(lands =>
      this.landCollectionStore = lands
      )
  }

  public onContextMenu(event: MouseEvent, land: Land) :void{
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': land };
    this.contextMenu.openMenu();
  }

  public onContextMenuUpdateName(land: Land) : void{
    this.rowIdToEdit = land.id;
  }

  public onContextMenuRemoveLand(land: Land) : void{
    this.landStore.dispatch(new landActions.RemoveLand(land.id))
  }

  public rowEditable(rowIdToEdit: number) : boolean{
    return this.rowIdToEdit === rowIdToEdit;
  }

  public checkEnterKey(land: Land): void{
    this.landStore.dispatch(new landActions.UpdateLandName({landId: land.id, landName: land.landName}) )
    this.rowIdToEdit = null;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddLandPopupComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      let land = result as Land 
      land.id = this.landCollectionStore.length;
      land.areaInHektars = +result.areaInHektars;
      this.landStore.dispatch(new landActions.AddLand(land))
    });
  }
}