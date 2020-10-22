import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaymentsService } from 'src/app/services/payments.service';

import { NewPaymentFormComponent } from './new-payment-form.component';

describe('NewPaymentFormComponent', () => {
  let component: NewPaymentFormComponent;
  let fixture: ComponentFixture<NewPaymentFormComponent>;
  let paymentsService: PaymentsService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ NewPaymentFormComponent ],
      providers: [PaymentsService]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentFormComponent);
    component = fixture.componentInstance;
    paymentsService = fixture.debugElement.injector.get(PaymentsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the payment with name "Internet" and cost 1 when the click button ADD', () => {
    const payment = "Internet";
    const cost = "1";

    component.newPaymentForm.get("payment").setValue(payment)
    component.newPaymentForm.get("cost").setValue(cost)
    fixture.detectChanges()

    const button = fixture.debugElement.query(By.css(".button-blue"))
    button.nativeElement.click();
    fixture.detectChanges()

    
    expect(paymentsService.payments$.getValue()).toEqual([{name:"Internet", cost: "1", months:[]}]);
  });

  // it('should add class up in label when input payment in focus', () => {
    
  //   const input = fixture.debugElement.query(By.css("[formControlName='payment']"))
  //   button.nativeElement.click();
  //   fixture.detectChanges()

    
  //   expect(paymentsService.payments$.getValue()).toEqual([{name:"Internet", cost: "1", months:[]}]);
  // });
});
