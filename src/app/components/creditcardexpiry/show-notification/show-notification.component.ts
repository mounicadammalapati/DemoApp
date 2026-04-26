import { Component } from '@angular/core';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-show-notification',
  imports: [AddNotificationComponent, MatButtonModule],
  templateUrl: './show-notification.component.html',
  styleUrl: './show-notification.component.css'
})
export class ShowNotificationComponent {
 showAddNotification = false;
  constructor() { }
}
