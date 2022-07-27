import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, map, Observable, shareReplay } from 'rxjs';
import { ILedger, ILedgerDetailLine } from 'src/server';
import { VoucherNumberServiceService } from 'src/server/api/voucherNumberService.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit , AfterViewInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  public journalForm!: FormGroup;
  public entryForm!: FormGroup;

  isFormLoaded : boolean = false;
  txTypeLabel: string = 'Debit';
  selectedLedger: ILedger;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'ledgerName',
    'description',
    'debit', 
    'credit'
  ];

  dataSource = new MatTableDataSource<ILedgerDetailLine>([]);
  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  totalCredit: number;
  totalDebit: number;

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder, 
    public voucherNumberService: VoucherNumberServiceService,private _snackBar: MatSnackBar) { 
    this.totalCredit = 0;
    this.totalDebit = 0; 
    this.initalizeJournalForm();     
  }

  ngOnInit(): void {

    this.voucherNumberService.getNextVoucherNumber(new Date().toISOString(), "in.solpro.nucleus.accounting.model.IJournalTx", 0).subscribe({
      next: (data) => {
        this.journalForm.patchValue({
          vouchernumber : data.voucherNumber
        });
        this.isFormLoaded = true;
      },
      error: () => {}
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initalizeJournalForm() : void {
    this.journalForm = this.formBuilder.group({      
      jacksontype: 'JournalTxImpl',
      vouchernumber : new FormControl( {value:"", disabled: true}, [ Validators.required]),
      transactiondate : new FormControl(new Date()),
      referenceNo: new FormControl(),
      chequedate: new FormControl({value : new Date(), disabled: true}),
      chequenumber : new FormControl(),
      ledgerDetailLines:  new FormArray([       
      ])
    });

    this.initializeEntryForm();

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

    this.entryForm.controls['txType']?.valueChanges.subscribe({
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
    this.selectedLedger = selectedLedger;
  }

  addJounralEntry() : void {
    if(this.entryForm.valid) {      
      let ledgerDetailLines = this.journalForm.get("ledgerDetailLines")?.value;

      let debit : number = 0;
      let credit : number = 0;
      let enteredAmount : number = this.entryForm.controls["lineAmount"].value;
      if(this.entryForm.controls["txType"].value as boolean){
        credit = enteredAmount;
      }else{
        debit = enteredAmount;
      }

      ledgerDetailLines.push({
        jacksontype: 'LedgerDetailLineImpl',
        ledgerName: this.selectedLedger.name,
        ledgerId: this.selectedLedger.id,
        chequeDate: this.journalForm.controls["chequedate"].value,
        description: this.entryForm.controls["description"].value,
        debit: debit,
        credit: credit
      });

      this.totalCredit = +this.totalCredit + +credit;
      this.totalDebit = +this.totalDebit + +debit;
      
      this.dataSource.data = this.journalForm.get("ledgerDetailLines")?.value as Array<ILedgerDetailLine>;       
      this.initializeEntryForm();
    }    
  }

  getEntryFormControl(name: string) {
    return this.entryForm.get(name) as FormControl;
  }

  saveJournalTx() : void {
    this._snackBar.open("Credit & Debit amount must be equal",'Close', {     
      duration: 2000
    });
  }
}
