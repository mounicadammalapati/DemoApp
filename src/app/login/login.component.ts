import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { filter, Subject, takeUntil } from 'rxjs';
import { AuthenticationResult, EventMessage, InteractionStatus, InteractionType, PopupRequest, EventType, RedirectRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, CommonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Try absolute path first (with leading slash)
  imagePath = '/assests/images/background_app.jpg';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  msalLogin() {
    this.router.navigate(['/msal-login']);
  }

  accessKeyLogin() {
    this.router.navigate(['/accesskeylogin']);

  }

}
