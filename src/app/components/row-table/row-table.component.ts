import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Payments from 'src/app/models/Payments';
import ModifyMonths from 'src/app/models/ModifyMonts';
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
  @Output() changeMonths: EventEmitter<ModifyMonths> = new EventEmitter<ModifyMonths>();
  @Output() removePayment: EventEmitter<number> = new EventEmitter<number>();


  constructor(public paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.months = this.paymentsService.monthsDays.map(month=>month.name);
  }
  
  checkMonth(event): void{
    let arrName = event.target.name.split("_");
    if(event.target.checked) this.payment.months.push(+arrName[1]);
    if(!event.target.checked) {
      const indexMonth = this.payment.months.indexOf(+arrName[1])
      this.payment.months.splice(indexMonth, 1);
    }
    this.changeMonths.emit({indexPayment: this.indexPayment, months: this.payment.months})
  }

  remove(): void{
    console.log(this.indexPayment)
    this.removePayment.emit(this.indexPayment)
  }




}
