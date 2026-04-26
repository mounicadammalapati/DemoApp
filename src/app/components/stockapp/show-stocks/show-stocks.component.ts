import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StockService } from '../services/stock.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StockSymbol, StockSymbolResults } from '../models/stocksmodels';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, switchMap, Subscription } from 'rxjs';
import { ShowStockDetailsComponent } from '../show-stock-details/show-stock-details.component';

@Component({
  selector: 'app-show-stocks',
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MatAutocompleteModule, MatSelectModule,
    ShowStockDetailsComponent
  ],
  templateUrl: './show-stocks.component.html',
  styleUrl: './show-stocks.component.css'
})
export class ShowStocksComponent implements OnInit {
  stockSearchForm!: FormGroup;
  filteredStocks: StockSymbol[] = [];

  private valueChangesSub?: Subscription;

  constructor(private stockService: StockService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.stockSearchForm = this.fb.group({
      searchSymbol: ['']
    });
    
    this.formChanges();
  }

  formChanges(){
    this.valueChangesSub = this.stockSearchForm.get('searchSymbol')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.stockService.getSuggestions(value))
      )
      .subscribe((data) => {
        var result = <StockSymbolResults>(data);
        this.filteredStocks = result.result;
      });
  }

  selectStock(stock: StockSymbol) {
    
    // Unsubscribe from valueChanges to stop further suggestions
    this.valueChangesSub?.unsubscribe();

    
  }
}

