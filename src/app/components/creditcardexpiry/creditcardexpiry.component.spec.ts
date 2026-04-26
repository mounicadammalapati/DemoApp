import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardexpiryComponent } from './creditcardexpiry.component';

describe('CreditcardexpiryComponent', () => {
  let component: CreditcardexpiryComponent;
  let fixture: ComponentFixture<CreditcardexpiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditcardexpiryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardexpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
