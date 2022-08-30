import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { TransactionsProvider } from 'src/app/services/transactionsProvider';
import { BillingClassificationServiceService } from 'src/server/api/billingClassificationService.service';
import { LedgerAttributesServiceService } from 'src/server/api/ledgerAttributesService.service';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { OtherChargesServiceService } from 'src/server/api/otherChargesService.service';
import { StockLocationServiceService } from 'src/server/api/stockLocationService.service';
import { TaxableEntityServiceService } from 'src/server/api/taxableEntityService.service';
import { OrderTxComponent } from '../order-tx.component';

@Component({
  selector: 'app-sale-order',
  templateUrl: '../order-tx.component.html',
  styleUrls: ['../order-tx.component.css']
})
export class SaleOrderComponent extends OrderTxComponent  implements OnInit {

  constructor(private sOBreakpointObserver: BreakpointObserver, private childFormBuilder : FormBuilder, 
    private childDateAdapterService  : CustomDateAdapterService, private childLedgerService : LedgerServiceService,
    private childstockLocationService : StockLocationServiceService, private childTaxableEntityService : TaxableEntityServiceService,
    private childTxProvider : TransactionsProvider, private childLedgerAttributesService : LedgerAttributesServiceService,
    private childBillingClassificationService : BillingClassificationServiceService,
    private childOtherChargesService : OtherChargesServiceService, private _childSnackBar: MatSnackBar) {
    super(sOBreakpointObserver, childFormBuilder, childDateAdapterService, childLedgerService, 
      childstockLocationService, childTaxableEntityService,
      childTxProvider, childLedgerAttributesService, childBillingClassificationService, childOtherChargesService, _childSnackBar);
    this.headerTitle = 'Sale Order';
  }

  ngOnInit(): void {
    this.initializeOrderTxForm();
  }

}
