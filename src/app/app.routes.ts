import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { Component } from '@angular/core';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { CreditcardexpiryComponent } from './components/creditcardexpiry/creditcardexpiry.component';
import { loginRequest } from './auth-config';
import { LoginComponent } from './login/login.component';
import { AccessKeyLoginComponent } from './login/access-key-login/access-key-login.component';
import { StockappComponent } from './components/stockapp/stockapp.component';
// Temporarily removed MsalGuard to test if it's causing the error
// import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [

    ]
  },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dash-board/dashboard-feature/dashboard-feature.module').then(m => m.DashboardFeatureModule)
  },
  {
    path: 'accesskeylogin',
    component: AccessKeyLoginComponent  
  },
  {
    path:'msal-login',
    loadComponent: () => import('./login/msal-login/msal-login.component').then(m => m.MsalLoginComponent)
  }
  // Temporarily removed canActivate: [MsalGuard] to test
];
