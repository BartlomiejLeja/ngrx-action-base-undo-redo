import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RouterState } from '@ngrx/router-store';
import { RouterStart, Navigation } from '../core/router/store/router.action';
import { StateHistory } from '../core/undoredo/store/state/undoredo.model';
import { getPresentAction, checkIfPastHistoryExist, chceckIfFutureHistoryExist, getFututeAction } from '../core/undoredo/store/undoredo.reducer';
import { UndoRedoActionTypes } from '../core/undoredo/store/undoredo.action';
import * as undoRedoAction from '../core/undoredo/store/undoredo.action'

@Component({
  selector: 'app-naviagtion',
  templateUrl: './naviagtion.component.html',
  styleUrls: ['./naviagtion.component.css']
})
export class NaviagtionComponent implements OnInit{
  
  public presentAction: any;
  public fututeAction: any;
  public isUndouable: any;
  public isRedoable: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private routerStore: Store<RouterState>,
    private undoredoStore: Store<StateHistory>) {
    let items = [
      { id: 0, landName: 'Prokocim Górny', adress: 'Bieżanowska 3', areaInHektars: 10 },
      { id: 1, landName: 'Prokocim Rynek',  adress: 'Bieżanowska 89', areaInHektars: 15 },
      { id: 2, landName: 'Prokocim Cmentarz',  adress: 'Bieżanowska 188', areaInHektars: 20 }
    ];

    let projects = [
      { id: 0, projectName: 'Apartamenty zielony Prokocim', numberOfLands: 3, profit: 100000 },
      { id: 1, projectName: 'Wzgórza Prokocimskie',  numberOfLands: 10, profit: 150000 },
      { id: 2, projectName: 'Prokocim multi housing',  numberOfLands: 45, profit: 200000 }
    ]

    localStorage.setItem("lands", JSON.stringify(items));
    
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  
  ngOnInit(): void {
   this.undoredoStore.select(getPresentAction).subscribe(
     presentAction=>{
      this.presentAction = presentAction
     }
   );

   this.undoredoStore.select(getFututeAction).subscribe(
     futureAction =>{
       this.fututeAction = futureAction
     }
   )

  this.undoredoStore.select(checkIfPastHistoryExist).subscribe (
      (is) =>{
        this.isUndouable =is,
        console.log(this.isUndouable);
      } 
    )
     
  this.undoredoStore.select(chceckIfFutureHistoryExist).subscribe(
    is =>{
      this.isRedoable =is
      console.log(this.isRedoable);
    } 
   );
  }

  public routeTo(url: any): void {
      let urlAddress = 'project'
      if(url==1) urlAddress ='land'
      this.routerStore.dispatch( new RouterStart({
        navigateTo: new Navigation([urlAddress])
      }));
  }

  public undo(): void{
    this.undoredoStore.dispatch(
      new undoRedoAction.Undo({
        presentAction: this.presentAction
      })
    )
  }

  public redo(): void{
    this.undoredoStore.dispatch(
      new undoRedoAction.Redo({
        fututeAction: this.fututeAction
      })
    )
  }
}
