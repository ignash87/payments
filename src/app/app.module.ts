import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { NewPaymentFormComponent } from './components/new-payment-form/new-payment-form.component';
import { TablePaymentsComponent } from './components/table-payments/table-payments.component';
import { RowTableComponent } from './components/row-table/row-table.component';
import { StatusPaymentsComponent } from './components/status-payments/status-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPaymentFormComponent,
    TablePaymentsComponent,
    RowTableComponent,
    StatusPaymentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
