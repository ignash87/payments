import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      imports: [ReactiveFormsModule, FormsModule],
      providers: [PaymentsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

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

  it('should add class up in label when input payment on focus', () => {
    const inputPayment = fixture.debugElement.query(By.css("[formControlName='payment']"));
    inputPayment.nativeElement.focus();
    fixture.detectChanges();
    const labelPayment = fixture.debugElement.query(By.css(".form__payment label span"));
    const paymentUp = labelPayment.nativeElement.classList.contains("up");
    
    
    expect(paymentUp).toBeTruthy();
  });

  it('should add class up in label when input cost on focus', () => {
    const inputCost = fixture.debugElement.query(By.css("[formControlName='cost']"));
    inputCost.nativeElement.focus();
    fixture.detectChanges();
    const labelCost = fixture.debugElement.query(By.css(".form__cost label span"));
    const costUp = labelCost.nativeElement.classList.contains("up")
    
    expect(costUp).toBeTruthy();
  });

  it('should remove the "up" class in the "input payment" field on the "blur" event if the field is empty', () => {
    const inputPayment = fixture.debugElement.query(By.css("[formControlName='payment']"));
    inputPayment.nativeElement.focus();
    inputPayment.nativeElement.blur();
    fixture.detectChanges();
    const labelPayment = fixture.debugElement.query(By.css(".form__payment label span"));
    const paymentUp = labelPayment.nativeElement.classList.contains("up")
    const paymentValue = inputPayment.nativeElement.value.length === 0

    expect(!paymentUp && paymentValue).toBeTruthy();
  });

  it('should not remove the "up" class in the "input payment" field on the "blur" event if the field is not empty', () => {
    const inputPayment = fixture.debugElement.query(By.css("[formControlName='payment']"));
    inputPayment.nativeElement.focus();
    inputPayment.nativeElement.value = "Hello"
    inputPayment.nativeElement.blur();
    fixture.detectChanges();
    const labelPayment = fixture.debugElement.query(By.css(".form__payment label span"));
    const paymentUp = labelPayment.nativeElement.classList.contains("up")
    const paymentValue = inputPayment.nativeElement.value.length === 0

    expect(paymentUp && !paymentValue).toBeTruthy();
  });

  it('should remove the "up" class in the "input cost" field on the "blur" event if the field is empty', () => {
    const inputCost = fixture.debugElement.query(By.css("[formControlName='cost']"));
    inputCost.nativeElement.focus();
    inputCost.nativeElement.blur();
    fixture.detectChanges();
    const labelCost = fixture.debugElement.query(By.css(".form__cost label span"));
    const costUp = labelCost.nativeElement.classList.contains("up")
    const costValue = inputCost.nativeElement.value.length === 0
    
    expect(!costUp && costValue).toBeTruthy();
  });

  it('should not remove the "up" class in the "input cost" field on the "blur" event if the field is not empty', () => {
    const inputCost = fixture.debugElement.query(By.css("[formControlName='cost']"));
    inputCost.nativeElement.focus();
    inputCost.nativeElement.value = "5"
    inputCost.nativeElement.blur();
    fixture.detectChanges();
    const labelCost = fixture.debugElement.query(By.css(".form__cost label span"));
    const costUp = labelCost.nativeElement.classList.contains("up")
    const costValue = inputCost.nativeElement.value.length === 0
    
    expect(costUp && !costValue).toBeTruthy();
  });
});
