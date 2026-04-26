import { Component, OnInit } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatToolbarModule, MatButtonModule, RouterOutlet, RouterLink, MatToolbarModule],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit {
  isCollapsed = false;
  userName: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: MsalService,
  ) {}


  ngOnInit(): void {
   // this.userName = localStorage.getItem('userName') || 'User';
    this.setLoginDisplay();
  }


  setLoginDisplay() {
      var loginDisplay = this.authService.instance.getAllAccounts().length > 0;
      const activeAccount = this.authService.instance.getActiveAccount();
  
      if (activeAccount) {
        this.userName = activeAccount.name || activeAccount.username || null;
      } else {
        this.userName = null;
      }
  }

  //  this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  //     const activeAccount = this.authService.instance.getActiveAccount();

  goToNotificationSystem() {
    // Navigate to child route relative to current route
    this.router.navigate(['creditcardExpiry'], { relativeTo: this.route });
  }

  goToStockApp(){
    this.router.navigate(['stockapp'], { relativeTo: this.route });
  }

  isCreditCardRoute(): boolean {
    return this.router.url.includes('creditcardExpiry') || this.router.url.includes('stockapp');
  }

  isStockAppRoute(): boolean {
    return this.router.url.includes('stockapp');
  }

  logout(){
    this.authService.logout();
  }
}


