import { BreakpointObserver } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { OverlayService } from 'src/app/services/overlay.service';
import { TransactionsProvider } from 'src/app/services/transactionsProvider';
import { IPurchaseOrderTx } from 'src/server';
import { BillingClassificationServiceService } from 'src/server/api/billingClassificationService.service';
import { LedgerAttributesServiceService } from 'src/server/api/ledgerAttributesService.service';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { OtherChargesServiceService } from 'src/server/api/otherChargesService.service';
import { PurchaseOrderTxServiceService } from 'src/server/api/purchaseOrderTxService.service';
import { StockLocationServiceService } from 'src/server/api/stockLocationService.service';
import { TaxableEntityServiceService } from 'src/server/api/taxableEntityService.service';
import { VoucherNumberServiceService } from 'src/server/api/voucherNumberService.service';
import { OrderTxComponent } from '../order-tx.component';

@Component({
  selector: 'app-purchase',
  templateUrl: '../order-tx.component.html',
  styleUrls: ['../order-tx.component.css']
})
export class PurchaseComponent extends OrderTxComponent  implements OnInit {

  constructor(private purchaseBreakpointObserver: BreakpointObserver, private childFormBuilder : FormBuilder, 
    private childDateAdapterService  : CustomDateAdapterService,private voucherNumberService : VoucherNumberServiceService, private childLedgerService : LedgerServiceService,
    private childstockLocationService : StockLocationServiceService, private childTaxableEntityService : TaxableEntityServiceService,
    private childTxProvider : TransactionsProvider, private childLedgerAttributesService : LedgerAttributesServiceService,
    private childBillingClassificationService : BillingClassificationServiceService,
    private childOtherChargesService : OtherChargesServiceService, private _childSnackBar: MatSnackBar, private datePipe: DatePipe,
    private overlayService : OverlayService,private purchaseOrderTxService : PurchaseOrderTxServiceService) {
    super(purchaseBreakpointObserver, childFormBuilder, childDateAdapterService, childLedgerService, childstockLocationService, childTaxableEntityService,
      childTxProvider, childLedgerAttributesService, childBillingClassificationService,childOtherChargesService, _childSnackBar);
    this.headerTitle = 'Purchase';

  }

  ngOnInit(): void {
    this.initializeOrderTxForm();

    let txDate = this.datePipe.transform(new Date(),'yyyy-mm-dd HH:mm:ss');

    this.voucherNumberService.getNextVoucherNumber(txDate!, "in.solpro.nucleus.inventory.model.IPurchaseOrderTx", 0).subscribe({
        next: (data) =>{
          this.orderTxForm.patchValue({
            vouchernumber : data.voucherNumber
          });

          this.orderTxForm.controls["vouchernumber"].enable();  
          this.receivedAmount.disable();  
          this.returnAmount.disable();      
        }
    });
  }

  public saveOrderTx(): void {
    
    if(this.netFinalAmount.value != 0) {     

      this.overlayService.enableProgressSpinner();

      let  tx : IPurchaseOrderTx = {};
      tx.jacksontype = "PurchaseOrderTxImpl";
      tx.transactiondate = this.orderTxForm.controls["transactiondate"].value;
      tx.billingDate = this.orderTxForm.controls["transactiondate"].value;
      tx.billingGroup = this.childTxProvider.billingGroup().id;
      tx.billingClassification = this.childTxProvider.billingClassification().id;
      tx.vouchernumber = this.orderTxForm.controls["vouchernumber"].value;
      tx.ledger = this.orderTxForm.controls["ledgerId"].value;
      tx.printName = this.orderTxForm.controls["billName"].value;
      tx.taxableLines = this.itemLines;
      tx.otherChargesLines = this.addedOtherCharges;
      tx.otherChargesTotal = this.otherChargesTotalAmount.value;
      tx.receivedAmount = this.receivedAmount.value;
      tx.returnAmount = this.returnAmount.value;     

      this.purchaseOrderTxService.save(tx).subscribe({
        next: (data) => {          
          this.initializeOrderTxForm();
          this.overlayService.disableProgressSpinner();
        },
        error: () => {
          this.overlayService.disableProgressSpinner();
        }
      });
    }
  }

}
