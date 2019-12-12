import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleModifyComponent } from './vehicle-modify.component';

describe('VehicleModifyComponent', () => {
  let component: VehicleModifyComponent;
  let fixture: ComponentFixture<VehicleModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
