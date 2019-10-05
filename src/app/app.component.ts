import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-action-base-undo-redo';

  constructor(){
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
}
