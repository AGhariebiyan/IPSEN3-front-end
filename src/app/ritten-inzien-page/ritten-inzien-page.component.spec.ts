import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RittenInzienPageComponent } from './ritten-inzien-page.component';

describe('RittenInzienPageComponent', () => {
  let component: RittenInzienPageComponent;
  let fixture: ComponentFixture<RittenInzienPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RittenInzienPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RittenInzienPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
