import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCleaningPage } from './form-cleaning.page';

describe('FormCleaningPage', () => {
  let component: FormCleaningPage;
  let fixture: ComponentFixture<FormCleaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCleaningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCleaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
