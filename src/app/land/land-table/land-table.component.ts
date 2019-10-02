import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { LandService } from '../services/land.service';
import { Store } from '@ngrx/store';
import { LandState } from '../store/state/land.model';
import { getlands } from '../store/land.reducer';
import * as landActions from '../store/land.action';
import { AddLandPopupComponent } from '../add-land-popup/add-land-popup.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-land-table',
  templateUrl: './land-table.component.html',
  styleUrls: ['./land-table.component.css']
})
export class LandTableComponent implements OnInit {
  public landCollectionStore : Item[];
  private rowIdToEdit: number
  constructor (
    private landStore: Store<LandState>, 
    public dialog: MatDialog){}

  ngOnInit() {
    this.landStore.dispatch(new landActions.GetLands() )
    this.landStore.select(getlands).subscribe(l =>
      this.landCollectionStore = l
      )
  }

  public displayedColumns: string[] = ['landName', 'adress', 'areaInHektars'];

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: Item) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.openMenu();
  }

  onContextMenuUpdateName(item: Item) {
    this.rowIdToEdit = item.id;
  }

  onContextMenuRemoveLand(item: Item) {
    this.landStore.dispatch(new landActions.RemoveLand(item.id))
  }

  rowEditable(item: number) : boolean{
    return this.rowIdToEdit === item;
  }

  checkEnterKey($event, item: Item){
    //this.landService.updateLandName(item.id, item.landName).subscribe();
    let landId =item.id;
    let landName =item.landName;
    this.landStore.dispatch(new landActions.UpdateLandName({landId: landId, landName: landName}) )
    this.rowIdToEdit = null;
    
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddLandPopupComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      let test = result as Item 
      test.id = this.landCollectionStore.length;
      test.areaInHektars = +result.areaInHektars;
      this.landStore.dispatch(new landActions.AddLand(test))
    });
  }
}

export interface Item {
  id: number;
  landName: string;
  adress: string;
  areaInHektars: number
}