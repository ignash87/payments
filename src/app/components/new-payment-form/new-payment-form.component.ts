import { Component, ElementRef, OnInit, Renderer2, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'new-payment-form',
  templateUrl: './new-payment-form.component.html',
  styleUrls: ['./new-payment-form.component.css']
})
export class NewPaymentFormComponent implements OnInit{
  @ViewChildren('input') public inputs: QueryList<ElementRef>;
  newPaymentForm: FormGroup;

  constructor(public paymentsService: PaymentsService, public renderer: Renderer2) { 
    this.newPaymentForm = new FormGroup({
      'payment': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'cost': new FormControl('', [costValidator()])
    })
   }

  ngOnInit(): void {}

  addPayment(): void{
      const value = this.newPaymentForm.value;
      const currentPayments=this.paymentsService.payments$.getValue();

      const newPayment = {name: value.payment, cost: value.cost , months: []};
      this.paymentsService.payments$.next([...currentPayments, newPayment]);
      this.inputs.forEach(input=> this.renderer.removeClass(this.renderer.nextSibling(input.nativeElement), "up"));

      this.newPaymentForm.reset();
  }

  handlerFocus(elem): void{
    this.renderer.addClass(this.renderer.nextSibling(elem), "up")
  }
  
  handlerBlur(elem): void{
    if(!elem.value) this.renderer.removeClass(this.renderer.nextSibling(elem), "up");
  }

}

function costValidator(): ValidatorFn{
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    let costRgEx: RegExp = /^[0-9.]{1,}$/;
    let valid = +control.value>0 && costRgEx.test(control.value);
    return valid ? null : {cost: true};
  };
}
