import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { TransactionsProvider } from 'src/app/services/transactionsProvider';
import { BillingClassificationServiceService } from 'src/server/api/billingClassificationService.service';
import { LedgerAttributesServiceService } from 'src/server/api/ledgerAttributesService.service';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { TaxableEntityServiceService } from 'src/server/api/taxableEntityService.service';
import { TaxClassServiceService } from 'src/server/api/taxClassService.service';
import { TaxGroupServiceService } from 'src/server/api/taxGroupService.service';
import { OrderTxComponent } from '../order-tx.component';

@Component({
  selector: 'app-sale',
  templateUrl: '../order-tx.component.html',
  styleUrls: ['../order-tx.component.css']
})
export class SaleComponent extends OrderTxComponent  implements OnInit {

  constructor(private saleBreakpointObserver: BreakpointObserver, private childFormBuilder : FormBuilder, 
    private childDateAdapterService  : CustomDateAdapterService, private childLedgerService : LedgerServiceService,
    private childTaxGroupService : TaxGroupServiceService, private childTaxableEntityService : TaxableEntityServiceService,
    private childTxProvider : TransactionsProvider, private childLedgerAttributesService : LedgerAttributesServiceService,
    private childBillingClassificationService : BillingClassificationServiceService) {
    super(saleBreakpointObserver, childFormBuilder, childDateAdapterService, childLedgerService, childTaxGroupService, childTaxableEntityService
      ,childTxProvider, childLedgerAttributesService, childBillingClassificationService);
    this.headerTitle = 'Sale';
  }

  ngOnInit(): void {
    this.initializeOrderTxForm();
  }

}
