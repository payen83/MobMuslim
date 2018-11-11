import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfinementPage } from './form-confinement.page';

describe('FormConfinementPage', () => {
  let component: FormConfinementPage;
  let fixture: ComponentFixture<FormConfinementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConfinementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfinementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
