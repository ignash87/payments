import { TestBed } from '@angular/core/testing';

import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should be 31 days if month 0', () => {
  //   const result = service.
  //   expect(service).toBeTruthy();
  // });
});
