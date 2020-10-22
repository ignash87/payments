import { TestBed } from '@angular/core/testing';

import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[PaymentsService]});
    service = TestBed.inject(PaymentsService);
  });

  it('should be created service', () => {
    expect(service).toBeTruthy();
  });

  it('should be total 62 if 1 payment and checked month with index 0 and cost 2', () => {
    const newPayment = {name: "", cost: "2", months: [0]};
    service.payments$.next([newPayment]);
    let total = service.countTotal();

    expect(total).toBe(62);
  });
});
