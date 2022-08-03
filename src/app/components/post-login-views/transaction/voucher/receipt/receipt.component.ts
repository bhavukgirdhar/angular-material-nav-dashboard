import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OverlayService } from 'src/app/services/overlay.service';
import { ILedgerDetailLine, IReceiptTx, ReceiptTxImpl } from 'src/server';
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
export class ReceiptComponent extends VoucherComponent implements OnInit {

    receiptTx: IReceiptTx;

    constructor(private receiptBreakpointObserver: BreakpointObserver, private receiptOverlayService : OverlayService, private receiptFormBuilder: FormBuilder,
        private voucherNumberService: VoucherNumberServiceService,  private paymentService: PaymentTxServiceService, 
        private receiptService: ReceiptTxServiceService, private  receiptLedgerService : LedgerServiceService) {
        super(receiptBreakpointObserver,receiptOverlayService,  receiptFormBuilder, "ReceiptTxImpl", paymentService, receiptService, receiptLedgerService);
        this.headerTitle = "Receipt";
    }

    ngOnInit(): void {
        this.receiptTx = {};

        let voucherClass = "in.solpro.nucleus.accounting.model.IReceiptTx";
        let voucherSubType = 0;

        this.voucherNumberService.getNextVoucherNumber(new Date().toISOString(), voucherClass, voucherSubType).subscribe({
            next: (data) => {
                this.voucherForm.patchValue({
                    vouchernumber: data.voucherNumber,
                    amount: this.receiptTx.totalDebit
                });
                this.isFormLoaded = true;
            },
            error: () => { }
        });
    }

    
}
