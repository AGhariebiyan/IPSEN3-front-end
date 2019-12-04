import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapsLocSearchComponent } from './gmaps-loc-search.component';

describe('GmapsLocSearchComponent', () => {
  let component: GmapsLocSearchComponent;
  let fixture: ComponentFixture<GmapsLocSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapsLocSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapsLocSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
