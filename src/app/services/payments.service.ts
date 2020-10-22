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
  monthsDays: Month[] = this.MONTHS.map((month, index)=>({name: month, days: this.getDaysInMonth(index+1)}));
  payments$: BehaviorSubject<Payments[]> = new BehaviorSubject<Payments[]>([]) ;

  constructor() { }

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
    return new Date(new Date().getFullYear(), month, 0).getDate();
  };
}
