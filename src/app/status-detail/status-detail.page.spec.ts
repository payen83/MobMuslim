import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDetailPage } from './status-detail.page';

describe('StatusDetailPage', () => {
  let component: StatusDetailPage;
  let fixture: ComponentFixture<StatusDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
