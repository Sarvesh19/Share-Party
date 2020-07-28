import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPartyComponent } from './request-party.component';

describe('RequestPartyComponent', () => {
  let component: RequestPartyComponent;
  let fixture: ComponentFixture<RequestPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
