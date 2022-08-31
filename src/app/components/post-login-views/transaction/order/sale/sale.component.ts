import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
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
import { TaxClassServiceService } from 'src/server/api/taxClassService.service';
import { TaxGroupServiceService } from 'src/server/api/taxGroupService.service';
import { VoucherNumberServiceService } from 'src/server/api/voucherNumberService.service';
import { OrderTxComponent } from '../order-tx.component';

@Component({
  selector: 'app-sale',
  templateUrl: '../order-tx.component.html',
  styleUrls: ['../order-tx.component.css']
})
export class SaleComponent extends OrderTxComponent  implements OnInit {

  constructor(private saleBreakpointObserver: BreakpointObserver, private childFormBuilder : FormBuilder, 
    private childDateAdapterService  : CustomDateAdapterService,private voucherNumberService : VoucherNumberServiceService, private childLedgerService : LedgerServiceService,
    private childstockLocationService : StockLocationServiceService, private childTaxableEntityService : TaxableEntityServiceService,
    private childTxProvider : TransactionsProvider, private childLedgerAttributesService : LedgerAttributesServiceService,
    private childBillingClassificationService : BillingClassificationServiceService,
    private childOtherChargesService : OtherChargesServiceService, private _childSnackBar: MatSnackBar, private datePipe: DatePipe) {
    super(saleBreakpointObserver, childFormBuilder, childDateAdapterService, 
      childLedgerService, childstockLocationService, childTaxableEntityService
      ,childTxProvider, childLedgerAttributesService, childBillingClassificationService, childOtherChargesService,_childSnackBar);
    this.headerTitle = 'Sale';
  }

  ngOnInit(): void {
    this.initializeOrderTxForm();

    let txDate = this.datePipe.transform(new Date(),'yyyy-mm-dd HH:mm:ss');

    this.voucherNumberService.getNextVoucherNumber(txDate!, "in.solpro.nucleus.inventory.model.ISaleOrderTx", 0).subscribe({
        next: (data) =>{
          this.orderTxForm.patchValue({
            vouchernumber : data.voucherNumber
          });
        }
    });
  }

}
