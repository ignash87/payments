import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPaymentsComponent } from './status-payments.component';

describe('StatusPaymentsComponent', () => {
  let component: StatusPaymentsComponent;
  let fixture: ComponentFixture<StatusPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
