import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompletedPage } from './form-completed.page';

describe('FormCompletedPage', () => {
  let component: FormCompletedPage;
  let fixture: ComponentFixture<FormCompletedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCompletedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
