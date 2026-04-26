import { Component } from '@angular/core';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-show-notification',
  imports: [AddNotificationComponent,MatButtonModule,NgIf],
  templateUrl: './show-notification.component.html',
  styleUrl: './show-notification.component.css'
})
export class ShowNotificationComponent {
 showAddNotification = false;
  constructor() { }
}
