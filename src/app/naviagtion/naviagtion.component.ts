import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RouterState } from '@ngrx/router-store';
import { RouterStart, Navigation } from '../core/router/store/router.action';

@Component({
  selector: 'app-naviagtion',
  templateUrl: './naviagtion.component.html',
  styleUrls: ['./naviagtion.component.css']
})
export class NaviagtionComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private routerStore: Store<RouterState>) {
    let items = [
      { id: 0, landName: 'Prokocim Górny', adress: 'Bieżanowska 3', areaInHektars: 10 },
      { id: 1, landName: 'Prokocim Rynek',  adress: 'Bieżanowska 89', areaInHektars: 15 },
      { id: 2, landName: 'Prokocim Cmentarz',  adress: 'Bieżanowska 188', areaInHektars: 20 }
    ];

    localStorage.setItem("lands", JSON.stringify(items));
  }

  public routeTo(url: any): void {
      let urlAddress = 'project'
      if(url==1) urlAddress ='land'
      this.routerStore.dispatch( new RouterStart({
        navigateTo: new Navigation([urlAddress])
      }));
  }
}
