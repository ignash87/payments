import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTableComponent } from './row-table.component';
import ModifyMonths from 'src/app/models/ModifyMonts';
import { By } from '@angular/platform-browser';


describe('RowTableComponent', () => {
  let component: RowTableComponent;
  let fixture: ComponentFixture<RowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should pass the index to be removed by the event emitter', () => {
    let result = null;
    component.indexPayment = 0;
    component.removePayment.subscribe(index=> {
      result = index});
    component.remove();
    expect(result).toBe(0);
  });

  it('should pass the months to be change by the event emitter', () => {
    let result = null;
    component.payment={name: '', cost: '', months: [1, 2, 4]}
    component.indexPayment = 0;
    fixture.detectChanges()
    component.changeMonths.subscribe(data=> result = data);
    const checkbox = fixture.debugElement.query(By.css("[name='0_1']"))
    checkbox.nativeElement.checked = true;

    checkbox.nativeElement.click();
    fixture.detectChanges()

    expect(result.months.length).toBe(2);
  });

  it('should delete the month when the checkbox is up', () => {
    let result = null;
    component.payment={name: '', cost: '', months: [1, 2, 4]}
    component.indexPayment = 0;
    fixture.detectChanges()
    const checkbox = fixture.debugElement.query(By.css("[name='0_1']"))
    checkbox.nativeElement.checked = true;
    checkbox.nativeElement.click();
    fixture.detectChanges()

    let months = component.payment.months;
    
    expect(months.length).toBe(2);
  });

  it('should add the month when the checkbox is down', () => {
    let result = null;
    component.payment={name: '', cost: '', months: [1, 2, 4]}
    component.indexPayment = 0;
    fixture.detectChanges()
    const checkbox = fixture.debugElement.query(By.css("[name='0_0']"))
    checkbox.nativeElement.click();
    fixture.detectChanges()

    let months = component.payment.months;
    
    expect(months.length).toBe(4);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
