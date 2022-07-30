import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { ILedger, ILedgerDetailLine, PLedgerMaster } from 'src/server';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
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
    private receiptTxService: ReceiptTxServiceService, private  ledgerService : LedgerServiceService) { 
    this.headerTitle = "";
    this.initializeVoucherForm();
    this.filterLedgersByGroupNames = ["Cash-in-hand", "Bank Accounts", "Bank OD A/c", "Bank OCC A/c"];
  }

  initializeVoucherForm(): void {

    //To fetch the cash ledger as a default ***by ledger***
    this.ledgerService.getCashLedger().subscribe({
      next: (data) => {

        this.voucherForm = this.formBuilder.group({
          jacksontype: [this.jacksonType],
          fromLedgerName : new FormControl('',  [ Validators.required]),
          byLedgerName : new FormControl(data.name,  [ Validators.required]),
          transactiondate : new FormControl(new Date()),
          vouchernumber : new FormControl( {value:"", disabled: true}, [ Validators.required]),
          referenceNo : new FormControl(''),
          description: new FormControl(''),
          amount: new FormControl('', [ Validators.required ]),
          fromLedgerDetailLine : this.formBuilder.group({
            jacksontype: ["LedgerDetailLineImpl"], 
            ledgerId: new FormControl(data.id),
            ledgerName: new FormControl(data.name),
            credit: new FormControl('')
          }),
          byLedgerDetailLine : this.formBuilder.group({
            jacksontype: ["LedgerDetailLineImpl"], 
            ledgerId: new FormControl(data.id),
            ledgerName: new FormControl(data.name),
            debit: new FormControl('')
          })
        });
    
        this.voucherForm.controls["amount"].valueChanges.subscribe({
          next: (data) => {
            this.voucherForm.controls["fromLedgerDetailLine"].patchValue({          
              credit: data
            });
            this.voucherForm.controls["byLedgerDetailLine"].patchValue({          
              debit: data
            });
          }
        });
      },
      error: () => {}
    });
   
  }

  onFromLedgerSelection(selectedLedger : PLedgerMaster) {
    this.voucherForm.controls["fromLedgerDetailLine"].patchValue({
      ledgerId: selectedLedger.id,
      ledgerName: selectedLedger.name
    });
  }

  onByLedgerSelection(selectedLedger : PLedgerMaster) {     
    this.voucherForm.controls["byLedgerDetailLine"].patchValue({
      ledgerId: selectedLedger.id,
      ledgerName: selectedLedger.name
    });
  }
  
  public saveVoucher(): void {
    if (this.voucherForm.valid) {

        let ledgerDetailsLines: ILedgerDetailLine[] = [];
        ledgerDetailsLines.push(this.voucherForm.controls["fromLedgerDetailLine"].value);
        ledgerDetailsLines.push(this.voucherForm.controls["byLedgerDetailLine"].value);

        let voucherForSave = this.formBuilder.group({
            jacksontype: this.voucherForm.controls["jacksontype"].value,
            transactiondate: this.voucherForm.controls["transactiondate"].value,
            vouchernumber: this.voucherForm.controls["vouchernumber"].value,
            referenceNo: this.voucherForm.controls["referenceNo"].value,
            description: this.voucherForm.controls["description"].value,
            ledgerDetailLines: [
              ledgerDetailsLines
            ]
        });

        if(this.jacksonType == "PaymentTxImpl") {
          this.paymentTxService.save(voucherForSave.value).subscribe({
            next: (data) => {
                this.initializeVoucherForm();
            },
            error: () => {}
          });
        }else if(this.jacksonType = "ReceiptTxImpl") {
          this.receiptTxService.save(voucherForSave.value).subscribe({
            next: (data) => {
              this.initializeVoucherForm();
            },
            error: () => { }
          });
        }
       
    }
}


}


