import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandTableComponent } from './land-table.component';

describe('LandTableComponent', () => {
  let component: LandTableComponent;
  let fixture: ComponentFixture<LandTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
