import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedPage } from './accepted.page';

describe('AcceptedPage', () => {
  let component: AcceptedPage;
  let fixture: ComponentFixture<AcceptedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
