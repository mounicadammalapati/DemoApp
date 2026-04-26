import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <h2>Profile</h2>
    <pre>{{ profile | json }}</pre>
  `
})
export class ProfileComponent {
  profile = { name: 'Demo User', email: 'demo@domain.com' };
}
