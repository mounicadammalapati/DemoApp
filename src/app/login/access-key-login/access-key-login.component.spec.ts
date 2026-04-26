import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessKeyLoginComponent } from './access-key-login.component';

describe('AccessKeyLoginComponent', () => {
  let component: AccessKeyLoginComponent;
  let fixture: ComponentFixture<AccessKeyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessKeyLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessKeyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
