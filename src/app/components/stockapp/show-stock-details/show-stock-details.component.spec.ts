import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStockDetailsComponent } from './show-stock-details.component';

describe('ShowStockDetailsComponent', () => {
  let component: ShowStockDetailsComponent;
  let fixture: ComponentFixture<ShowStockDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowStockDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
