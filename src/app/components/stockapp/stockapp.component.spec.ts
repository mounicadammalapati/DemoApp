import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockappComponent } from './stockapp.component';

describe('StockappComponent', () => {
  let component: StockappComponent;
  let fixture: ComponentFixture<StockappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
