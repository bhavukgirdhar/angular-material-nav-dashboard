import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { TaxClassServiceService } from 'src/server/api/taxClassService.service';
import { OrderTxComponent } from '../order-tx.component';

@Component({
  selector: 'app-sale',
  templateUrl: '../order-tx.component.html',
  styleUrls: ['../order-tx.component.css']
})
export class SaleComponent extends OrderTxComponent  implements OnInit {

  constructor(private saleBreakpointObserver: BreakpointObserver, private childFormBuilder : FormBuilder, 
    private childDateAdapterService  : CustomDateAdapterService, private childLedgerService : LedgerServiceService,
    private childTaxClassService : TaxClassServiceService) {
    super(saleBreakpointObserver, childFormBuilder, childDateAdapterService, childLedgerService, childTaxClassService);
    this.headerTitle = 'Sale';
  }

  ngOnInit(): void {
    this.initializeOrderTxForm();
  }

}
