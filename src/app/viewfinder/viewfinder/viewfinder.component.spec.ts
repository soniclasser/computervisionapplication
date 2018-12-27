import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfinderComponent } from './viewfinder.component';

describe('ViewfinderComponent', () => {
  let component: ViewfinderComponent;
  let fixture: ComponentFixture<ViewfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
