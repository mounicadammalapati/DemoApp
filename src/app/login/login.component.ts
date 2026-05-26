import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  msalLogin(): void {
    this.router.navigate(['/msal-login']);
  }

  accessKeyLogin(): void {
    this.router.navigate(['/accesskeylogin']);
  }
}
