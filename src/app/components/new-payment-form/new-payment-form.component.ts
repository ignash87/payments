import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'new-payment-form',
  templateUrl: './new-payment-form.component.html',
  styleUrls: ['./new-payment-form.component.css']
})
export class NewPaymentFormComponent implements OnInit, AfterViewInit {
  @ViewChild('payment') public payment: ElementRef;
  @ViewChild('cost') public cost: ElementRef;

  newPaymentForm: FormGroup;

  constructor(public paymentsService: PaymentsService) { 
    this.newPaymentForm = new FormGroup({
      'payment': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'cost': new FormControl('', [Validators.required, Validators.pattern('^[0-9.]{1,}$')])
    })
   }

  ngOnInit(): void {}

  addPayment(): void{
      const value = this.newPaymentForm.value;
      const currentPayments=this.paymentsService.payments$.getValue();

      const newPayment = {name: value.payment, cost: value.cost , months: []};
      this.paymentsService.payments$.next([...currentPayments, newPayment]);
      document.querySelectorAll("[formControlName]").forEach(elem=>elem.nextElementSibling.classList.remove("up"))

      this.newPaymentForm.reset();
  }

  handlerFocus(event): void{
    event.target.nextElementSibling.classList.add("up")
  }
  
  handlerBlur(event): void{
    if(event.target.value.length===0) event.target.nextElementSibling.classList.remove("up")
  }
  
  ngAfterViewInit(): void{
    this.payment.nativeElement.addEventListener('focus', this.handlerFocus);
    this.cost.nativeElement.addEventListener('focus', this.handlerFocus);
    this.payment.nativeElement.addEventListener('blur', this.handlerBlur);
    this.cost.nativeElement.addEventListener('blur', this.handlerBlur);
  }

}
