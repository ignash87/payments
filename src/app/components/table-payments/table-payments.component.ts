import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import ModifyMonths from 'src/app/models/ModifyMonts';
import Payments from 'src/app/models/Payments';
import { PaymentsService } from 'src/app/services/payments.service';
import { RowTableComponent } from '../row-table/row-table.component';

@Component({
  selector: 'table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.css'],
 
})

export class TablePaymentsComponent implements OnInit{
  months: string[];
  payments: Payments[];
  @ViewChildren(RowTableComponent) row: QueryList<RowTableComponent>

  constructor(public paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.months = this.paymentsService.monthsDays.map(month=>month.name);; 
    this.paymentsService.payments$.subscribe(data=>{
      this.payments = data;
    })
  }

  changeMonths(data: ModifyMonths): void{
    this.payments[data.indexPayment].months = data.months;
    this.paymentsService.payments$.next(this.payments)
  }

  removePayment(index){
    console.log(this.payments)
    this.payments.splice(index,1)
    this.paymentsService.payments$.next(this.payments)
  }

}
