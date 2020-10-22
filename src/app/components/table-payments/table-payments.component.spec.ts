import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePaymentsComponent } from './table-payments.component';
import { PaymentsService } from 'src/app/services/payments.service';


describe('TablePaymentsComponent', () => {
  let component: TablePaymentsComponent;
  let fixture: ComponentFixture<TablePaymentsComponent>;
  let paymentsService: PaymentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePaymentsComponent ], 
      providers: [PaymentsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePaymentsComponent);
    component = fixture.componentInstance;
    paymentsService = fixture.debugElement.injector.get(PaymentsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete payment', () => {
    paymentsService.payments$.next([
      ...paymentsService.payments$.getValue(), 
      {name: "", cost:"", months:[]}
    ]);
    component.removePayment(0);

    expect(paymentsService.payments$.getValue()).toEqual([]);
  });

  it('must change the months of the first payment from [1,2,3] to [1, 2]', () => {
    paymentsService.payments$.next([
      ...paymentsService.payments$.getValue(), 
      {name: "", cost:"", months:[1,2,3]}
    ]);
    component.changeMonths({indexPayment: 0, months: [1, 2]});

    const months  = paymentsService.payments$.getValue()[0].months;

    expect(months).toEqual([1,2]);
  });




});
