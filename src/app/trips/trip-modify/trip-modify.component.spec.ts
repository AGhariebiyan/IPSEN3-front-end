import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripModifyComponent } from './trip-modify.component';

describe('TripModifyComponent', () => {
  let component: TripModifyComponent;
  let fixture: ComponentFixture<TripModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
