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
import { VoucherComponent } from './voucher/voucher.component';
import { ReceiptTxServiceService } from 'src/server/api/receiptTxService.service';
import { PaymentTxServiceService } from 'src/server/api/paymentTxService.service';
import { FormControlPipe } from 'src/app/shared/pipes/form-control.pipe';
import { JournalComponent } from './journal/journal.component';
import { JournalTxServiceService } from 'src/server/api/journalTxService.service';

@NgModule({
    declarations: [
        TransactionBaseViewComponent,  
        //VoucherComponent,      
        PaymentComponent,
        ReceiptComponent,
        FormControlPipe,
        JournalComponent
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
      JournalTxServiceService 
    ],
    bootstrap: []
  })
  export class TransactionModule { }