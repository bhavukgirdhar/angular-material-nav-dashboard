import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OverlayService } from 'src/app/services/overlay.service';
import { ILedgerDetailLine, IPaymentTx } from 'src/server';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { PaymentTxServiceService } from 'src/server/api/paymentTxService.service';
import { ReceiptTxServiceService } from 'src/server/api/receiptTxService.service';
import { VoucherNumberServiceService } from 'src/server/api/voucherNumberService.service';
import { VoucherComponent } from '../voucher.component';

@Component({
  selector: 'app-payment-transaction',
  templateUrl: '../voucher.component.html',
  styleUrls: ['../voucher.component.css']
})
export class PaymentComponent extends VoucherComponent implements OnInit { 

  paymentTx :  IPaymentTx;

  constructor(private paymentBreakpointObserver: BreakpointObserver, private paymentOverlayService : OverlayService, private paymentFormBuilder : FormBuilder, 
    private voucherNumberService: VoucherNumberServiceService,
    private paymentService : PaymentTxServiceService, private receiptService: ReceiptTxServiceService, private  paymentLedgerService : LedgerServiceService) {
      super(paymentBreakpointObserver, paymentOverlayService, paymentFormBuilder, "PaymentTxImpl", paymentService, receiptService, paymentLedgerService);
      this.headerTitle = "Payment";
  }

  ngOnInit(): void {

    this.paymentTx = {};
    this.getNextVoucherNumber();
    
    this.isFormLoaded = true;      
  }

  public getNextVoucherNumber() {
    let voucherClass = "in.solpro.nucleus.accounting.model.IPaymentTx";
    let voucherSubType = 0;

    this.voucherNumberService.getNextVoucherNumber(new Date().toISOString(), voucherClass, voucherSubType).subscribe({
      next: (data) => {
        this.voucherForm.patchValue({
          vouchernumber: data.voucherNumber,
          amount: this.paymentTx.totalCredit
        });
        this.isFormLoaded = true;
      },
      error: () => { }
    });
  }
}
