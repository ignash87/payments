import { Component, OnInit } from '@angular/core';
import Payments from 'src/app/models/Payments';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.css'],
 
})

export class TablePaymentsComponent implements OnInit {
  months: string[]
  payments: Payments[];

  constructor(public paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.months = this.paymentsService.monthsDays.map(month=>month.name);; 
    this.paymentsService.payments$.subscribe(data=>{
      this.payments = data;
    })
  }

}
