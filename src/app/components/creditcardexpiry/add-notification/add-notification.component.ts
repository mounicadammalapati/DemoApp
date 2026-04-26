import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';


export const MONTH_YEAR_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-notification',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatCardModule],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_FORMAT },
  ],
  templateUrl: './add-notification.component.html',
  styleUrl: './add-notification.component.css'
})
export class AddNotificationComponent implements OnInit {
  addNotificationGroup!: FormGroup;
  formattedDate: string = '';

  notifyBy:string[]=['EMAIL','SMS'];
  expiryMonths:string[]=['01','02','03','04','05','06','07','08','09','10','11','12'];
  reminderDaysOptions:string[]=['1','5','10','15','20','25','30'];
  expiryYears:string[]=[];
  selectedNotifyType:string='EMAIL';

  constructor(private fb:FormBuilder, private cdr: ChangeDetectorRef){
    this.addNotificationGroup = this.fb.group({
      cardName: [''],
      creditCard4digit: [''],
      expiryMonth: [null, Validators.required],
      expiryYear: [null, Validators.required],
      notifyType: ['EMAIL'], //sms, email
      phoneNumber: [''],
      emailAddress: ['', [Validators.email]],
      remainderDays: [], //array of 1, 10 days
      notes: []
    });


  }
  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for(let i=0;i<10;i++){
      this.expiryYears.push((currentYear + i).toString());
    }
  }

  cancelAddNotification(){
    // Logic to cancel adding notification add signals here 
  }

}
