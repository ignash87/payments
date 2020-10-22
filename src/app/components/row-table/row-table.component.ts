import { Component, Input, OnInit } from '@angular/core';
import Payments from 'src/app/models/Payments';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'row-table',
  templateUrl: './row-table.component.html',
  styleUrls: ['./row-table.component.css', '../table-payments/table-payments.component.css'],
})

export class RowTableComponent implements OnInit {
  months: string[];
  @Input() payment: Payments;
  @Input() indexPayment: number;

  constructor(public paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.months = this.paymentsService.monthsDays.map(month=>month.name);
  }
  
  checkMonth(event): void{
    let arrName = event.target.name.split("_");
    if(event.target.checked) this.paymentsService.addMonthPayment(+arrName[0], +arrName[1]);
    if(!event.target.checked) this.paymentsService.removeMonthPayment(+arrName[0], +arrName[1]);
  }

  removePayment(): void{
    this.paymentsService.removePayment(this.indexPayment)
  }
}
