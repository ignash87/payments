import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Payments from '../models/Payments';

interface Month{
  name: string;
  days: number;
}

@Injectable({
  providedIn: 'root'
})

export class PaymentsService {
  MONTHS = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"]
  monthsDays: Month[] = this.MONTHS.map((month, index)=>({name: month, days: this.getDaysInMonth(index)}));
  payments$: BehaviorSubject<Payments[]> = new BehaviorSubject<Payments[]>([]) ;

  constructor() { }

  public addToPayments(payment): void{
    let newPayment = {name: payment.payment, cost: payment.cost , months: []};
    this.payments$.next([...this.payments$.value, newPayment])
  }

  public addMonthPayment(paymentIndex: number, monthIndex: number): void{
    let newResult = [...this.payments$.value];
    newResult[paymentIndex].months.push(monthIndex)
    this.payments$.next(newResult)
  }
  public removeMonthPayment(paymentIndex: number, monthIndex: number): void{
    let newResult = [...this.payments$.value];
    let newMonths = newResult[paymentIndex].months.filter(item=>item!==monthIndex);
    newResult[paymentIndex].months = newMonths;

    this.payments$.next(newResult)
  }

  public removePayment(index: number): void{
    let newPayment = [...this.payments$.value];
    newPayment.splice(index, 1);
    this.payments$.next(newPayment)
  }

  public countTotal(): number{
    let payments = [...this.payments$.value];
    let total = payments.reduce((acc, payment): number=>{
      let paymentMonths = payment.months;
      let numbersDays = paymentMonths.reduce((days, month): number=>{
        return days + this.monthsDays[month].days;
      }, 0)
      return acc + numbersDays*(+payment.cost)
    }, 0)
    return total
  }

  private getDaysInMonth(month: number): number {
    return 33 - new Date(new Date().getFullYear(), month, 33).getDate();
  };
}
