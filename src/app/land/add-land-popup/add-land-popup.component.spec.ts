import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLandPopupComponent } from './add-land-popup.component';

describe('AddLandPopupComponent', () => {
  let component: AddLandPopupComponent;
  let fixture: ComponentFixture<AddLandPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLandPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLandPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
