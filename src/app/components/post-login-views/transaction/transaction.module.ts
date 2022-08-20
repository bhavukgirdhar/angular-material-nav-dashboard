import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionBaseViewComponent } from './transaction-base-view/transaction-base-view.component';
import { PaymentComponent } from './voucher/payment/payment.component';
import { ReceiptComponent } from './voucher/receipt/receipt.component';
import { VoucherNumberServiceService } from 'src/server/api/voucherNumberService.service';
import { ReceiptTxServiceService } from 'src/server/api/receiptTxService.service';
import { PaymentTxServiceService } from 'src/server/api/paymentTxService.service';
import { FormControlPipe } from 'src/app/shared/pipes/form-control.pipe';
import { JournalComponent } from './journal/journal.component';
import { JournalTxServiceService } from 'src/server/api/journalTxService.service';

import { SaleComponent } from './order/sale/sale.component';
import { PurchaseComponent } from './order/purchase/purchase.component';
import { SaleOrderComponent } from './order/sale-order/sale-order.component';
import { ItemServiceService } from 'src/server/api/itemService.service';
import { TaxClassServiceService } from 'src/server/api/taxClassService.service';
import { TaxGroupServiceService } from 'src/server/api/taxGroupService.service';
import { TaxableEntityServiceService } from 'src/server/api/taxableEntityService.service';
import { TransactionsProvider } from 'src/app/services/transactionsProvider';
import { LedgerAttributesServiceService } from 'src/server/api/ledgerAttributesService.service';
import { BillingClassificationServiceService } from 'src/server/api/billingClassificationService.service';

@NgModule({
    declarations: [
        TransactionBaseViewComponent,          
        PaymentComponent,
        ReceiptComponent,
        FormControlPipe,
        JournalComponent,        
        SaleComponent,
        PurchaseComponent,
        SaleOrderComponent
    ],
    imports: [
      CommonModule,    
      FormsModule,
      ReactiveFormsModule,  
      FlexLayoutModule,      
      SharedModule,
      AngularMaterialModule,
      TransactionRoutingModule
    ],
    providers: [ 
      VoucherNumberServiceService,
      ReceiptTxServiceService,
      PaymentTxServiceService,
      JournalTxServiceService,
      ItemServiceService,
      BillingClassificationServiceService,
      LedgerAttributesServiceService,
      TaxClassServiceService,
      TaxGroupServiceService,
      TaxableEntityServiceService,
      TransactionsProvider
    ],
    bootstrap: []
  })
  export class TransactionModule { }