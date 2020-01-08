import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDeleteComponent } from './trip-delete.component';

describe('TripsComponent', () => {
  let component: TripDeleteComponent;
  let fixture: ComponentFixture<TripDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
