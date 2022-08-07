import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { OrderTxComponent } from '../order-tx.component';

@Component({
  selector: 'app-sale-order',
  templateUrl: '../order-tx.component.html',
  styleUrls: ['../order-tx.component.css']
})
export class SaleOrderComponent extends OrderTxComponent  implements OnInit {

  constructor(private sOBreakpointObserver: BreakpointObserver, private childFormBuilder : FormBuilder, 
    private childDateAdapterService  : CustomDateAdapterService, private childLedgerService : LedgerServiceService) {
    super(sOBreakpointObserver, childFormBuilder, childDateAdapterService, childLedgerService);
    this.headerTitle = 'Sale Order';
  }

  ngOnInit(): void {
    this.initializeOrderTxForm();
  }

}
