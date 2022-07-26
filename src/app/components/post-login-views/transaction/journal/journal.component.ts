import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, Observable, shareReplay } from 'rxjs';
import { ILedger } from 'src/server';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  public journalForm!: FormGroup;
  isFormLoaded : boolean = false;
  txTypeLabel: string = 'Debit';

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder) { 
    this.initalizeJournalForm();
  }

  ngOnInit(): void {
    this.isFormLoaded = true;
  }

  initalizeJournalForm() : void {
    this.journalForm = this.formBuilder.group({      
      jacksontype: 'JournalTxImpl',
      vouchernumber : new FormControl( {value:"", disabled: true}, [ Validators.required]),
      transactiondate : new FormControl(new Date()),
      referenceNo: new FormControl(),
      chequedate: new FormControl(new Date()),
      chequenumber : new FormControl(),
      entryForm : this.formBuilder.group({
        selectedLedgerName: new FormControl(""),
        selectedLedgerId: new FormControl(""),
        lineAmount: new FormControl(),
        txType: new FormControl(false),
        description: new FormControl()
      })      
    });

    this.journalForm.get('entryForm.txType')?.valueChanges.subscribe({
      next: (data) => {
        if(data){
          this.txTypeLabel = "Credit";
        }else {
          this.txTypeLabel = "Debit";
        }
      }
    });
  }

  onLedgerSelectionChange(selectedLedger : ILedger) : void {
    this.journalForm.patchValue({
      selectedLedgerId: selectedLedger.id,
      selectedLedgerName: selectedLedger.name
    });
  }

  getFormControl(name: string) {
    return this.journalForm.get(name) as FormControl;
  }
}
