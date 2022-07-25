import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { ILedger, ILedgerDetailLine } from 'src/server';
import { PaymentTxServiceService } from 'src/server/api/paymentTxService.service';
import { ReceiptTxServiceService } from 'src/server/api/receiptTxService.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  headerTitle : string;

  public voucherForm!: FormGroup;
  isFormLoaded : boolean = false;
  filterLedgersByGroupNames: string[];

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder, 
    @Inject(String) private jacksonType : String, private paymentTxService: PaymentTxServiceService, 
    private receiptTxService: ReceiptTxServiceService) { 
    this.headerTitle = "";
    this.initializeVoucherForm();
    this.filterLedgersByGroupNames = ["Cash-in-hand", "Bank Accounts", "Bank OD A/c", "Bank OCC A/c"];
  }

  initializeVoucherForm(): void {
    
    this.voucherForm = this.formBuilder.group({
      jacksontype: [this.jacksonType],
      transactiondate : [new Date()],
      vouchernumber : [{value: '', disabled: true}],
      referenceNo : [null],
      description: [null],
      amount: [null, Validators.required],
      fromLedgerDetailLine : this.formBuilder.group({
        jacksontype: ["LedgerDetailLineImpl"], 
        ledgerId: [],
        ledgerName: [],
        credit: []
      }),
      byLedgerDetailLine : this.formBuilder.group({
        jacksontype: ["LedgerDetailLineImpl"], 
        ledgerId: [],
        ledgerName: [],
        debit: []
      })
    });

    this.voucherForm.controls["amount"].valueChanges.subscribe({
      next: (data) => {
        this.voucherForm.controls["fromLedgerDetailLine"].patchValue({          
          credit: [data]
        });
        this.voucherForm.controls["byLedgerDetailLine"].patchValue({          
          debit: [data]
        });
      }
    });
   
  }

  onFromLedgerSelection(selectedLedger : ILedger) {
    this.voucherForm.controls["fromLedgerDetailLine"].patchValue({
      ledgerId: [selectedLedger.id],
      ledgerName: [selectedLedger.name]
    });
  }

  onByLedgerSelection(selectedLedger : ILedger) {
    this.voucherForm.controls["byLedgerDetailLine"].patchValue({
      ledgerId: [selectedLedger.id],
      ledgerName: [selectedLedger.name]
    });
  }
  
  public saveVoucher(): void {
    if (this.voucherForm.valid) {

        let ledgerDetailsLines: ILedgerDetailLine[] = [];
        ledgerDetailsLines.push(this.voucherForm.controls["fromLedgerDetailLine"].value);
        ledgerDetailsLines.push(this.voucherForm.controls["byLedgerDetailLine"].value);

        let voucherForSave = this.formBuilder.group({
            jacksontype: [this.voucherForm.controls["jacksontype"].value],
            transactiondate: [this.voucherForm.controls["transactiondate"].value],
            vouchernumber: [this.voucherForm.controls["vouchernumber"].value],
            referenceNo: [this.voucherForm.controls["referenceNo"].value],
            description: [this.voucherForm.controls["description"].value],
            ledgerDetailsLines: ledgerDetailsLines
        });

        if(this.jacksonType == "Payment") {
          this.paymentTxService.save(voucherForSave.value).subscribe({
            next: (data) => {
    
            },
            error: () => {}
          });
        }else if(this.jacksonType = "Receipt") {
          this.receiptTxService.save(voucherForSave.value).subscribe({
            next: (data) => {

            },
            error: () => { }
          });
        }
       
    }
}


}


