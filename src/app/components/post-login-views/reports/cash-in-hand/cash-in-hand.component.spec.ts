import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInHandComponent } from './cash-in-hand.component';

describe('CashInHandComponent', () => {
  let component: CashInHandComponent;
  let fixture: ComponentFixture<CashInHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashInHandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashInHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
