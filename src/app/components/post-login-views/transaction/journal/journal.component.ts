import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, map, Observable, shareReplay } from 'rxjs';
import { ILedger, ILedgerDetailLine } from 'src/server';

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
  public entryForm!: FormGroup;

  isFormLoaded : boolean = false;
  txTypeLabel: string = 'Debit';

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [
    'ledgerName',
    'description',
    'debit', 
    'credit'
  ];

  dataSource = new MatTableDataSource<ILedgerDetailLine>([]);

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
      ledgerDetailLines:  new FormArray([       
      ])
    });

    this.initializeEntryForm();

    this.journalForm.get('entryForm.txType')?.valueChanges.subscribe({
      next: (data) => {
        if(data){
          this.txTypeLabel = "Credit";
        }else {
          this.txTypeLabel = "Debit";
        }
      }
    });

    this.dataSource.data = this.journalForm.get("ledgerDetailLines")?.value;

  }

  private initializeEntryForm() {
    this.entryForm = this.formBuilder.group({
      ledgerName: new FormControl(null, [Validators.required]),
      ledgerId: new FormControl(null),
      lineAmount: new FormControl(null, [Validators.required]),
      txType: new FormControl(false),
      description: new FormControl()
    });
  }

  onLedgerSelectionChange(selectedLedger : ILedger) : void {
    console.log(selectedLedger);
  }

  addJounralEntry() : void {
    if(this.entryForm.valid) {

      
      let ledgerDetailLines = this.journalForm.get("ledgerDetailLines")?.value;

      ledgerDetailLines.push({
        jacksontype: 'LedgerDetailLineImpl',
        ledgerName: 'Bhavuk Girdhar'
      });
  
      this.initializeEntryForm();
      this.dataSource.data = this.journalForm.get("ledgerDetailLines")?.value as Array<ILedgerDetailLine>;       
    }    
  }

  getEntryFormControl(name: string) {
    return this.entryForm.get(name) as FormControl;
  }
}
