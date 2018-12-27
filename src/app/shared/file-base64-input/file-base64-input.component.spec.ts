import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBase64InputComponent } from './file-base64-input.component';

describe('FileBase64InputComponent', () => {
  let component: FileBase64InputComponent;
  let fixture: ComponentFixture<FileBase64InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBase64InputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBase64InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
