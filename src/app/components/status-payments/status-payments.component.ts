import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'status-payments',
  templateUrl: './status-payments.component.html',
  styleUrls: ['./status-payments.component.css']
})
export class StatusPaymentsComponent implements OnInit {
  total: number;

  constructor(public paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.paymentsService.payments$.subscribe(payments=>{
      this.total = this.paymentsService.countTotal();
    })
  }

}
