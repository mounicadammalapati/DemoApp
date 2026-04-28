import { Routes } from '@angular/router';
import { DashBoardComponent } from '../dash-board.component';
import { CreditcardexpiryComponent } from '../../creditcardexpiry/creditcardexpiry.component';
import { StockappComponent } from '../../stockapp/stockapp.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashBoardComponent,
    children: [
      { path: 'creditcardExpiry', component: CreditcardexpiryComponent },
      { path: 'stockapp', component: StockappComponent }
    ]
  }
];
        