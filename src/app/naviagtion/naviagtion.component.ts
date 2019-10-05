import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RouterState } from '@ngrx/router-store';
import { RouterStart, Navigation } from '../core/router/store/router.action';
import { StateHistory } from '../core/undoredo/store/state/undoredo.model';
import * as undoRedoAction from '../core/undoredo/store/undoredo.action'
import { getPresentAction, getFututeAction, checkIfPastHistoryExist, chceckIfFutureHistoryExist } from '../core/undoredo/store/undoredo.selector';

@Component({
  selector: 'app-naviagtion',
  templateUrl: './naviagtion.component.html',
  styleUrls: ['./naviagtion.component.css']
})
export class NaviagtionComponent implements OnInit{
  
  public presentAction: any;
  public futureAction: any;
  public isUndoable: boolean;
  public isRedoable: boolean;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private routerStore: Store<RouterState>,
    private undoRedoStore: Store<StateHistory>) {
  }

  ngOnInit(): void {
   this.undoRedoStore.select(getPresentAction).subscribe(
     presentAction=>{
      this.presentAction = presentAction
     }
   );

   this.undoRedoStore.select(getFututeAction).subscribe(
     futureAction =>{
       this.futureAction = futureAction
     }
   )

  this.undoRedoStore.select(checkIfPastHistoryExist).subscribe (
      (isPastHistoryExist) =>{
        this.isUndoable =isPastHistoryExist
      }
  );
     
  this.undoRedoStore.select(chceckIfFutureHistoryExist).subscribe(
    isFutureHistoryExist =>{
      this.isRedoable =isFutureHistoryExist
    } 
   );
  }

  public routeTo(url: string): void {
      this.routerStore.dispatch( new RouterStart({
        navigateTo: new Navigation([url])
      }));
  }

  public undo(): void{
    this.undoRedoStore.dispatch(
      new undoRedoAction.Undo({
        presentAction: this.presentAction
      })
    )
  }

  public redo(): void{
    this.undoRedoStore.dispatch(
      new undoRedoAction.Redo({
        fututeAction: this.futureAction
      })
    )
  }
}
