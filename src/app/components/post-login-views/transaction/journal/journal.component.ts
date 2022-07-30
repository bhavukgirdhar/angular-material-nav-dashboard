import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { ILedger, ILedgerDetailLine } from 'src/server';
import { JournalTxServiceService } from 'src/server/api/journalTxService.service';
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
  public entryRowId : number = 1;
  public isEntryEditModeEnabled : boolean = false;

  isFormLoaded : boolean = false;
  txTypeLabel: string = 'Debit';
  selectedLedger: ILedger;
  selectedLedgerDetailLine : any;


    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'ledgerName',
    'description',
    'debit', 
    'credit'
  ];

  dataSource = new MatTableDataSource<ILedgerDetailLine>([]);
  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  selectedRowIndex = -1;

  totalCredit: number;
  totalDebit: number;

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder, 
    public voucherNumberService: VoucherNumberServiceService,private journalTxService: JournalTxServiceService, private _snackBar: MatSnackBar) {     
    this.initalizeJournalForm();     
  }

  ngOnInit(): void {    
    this.getNewVoucherNo();
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
      chequeNo : new FormControl(),
      ledgerDetailLines:  new FormArray([       
      ])
    });

    this.totalCredit = 0;
    this.totalDebit = 0; 

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

  private getNewVoucherNo() : void {
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

  private resetEntryForm() : void {
    this.entryForm.patchValue({
      ledgerName: null,
      ledgerId: null,
      lineAmount: null,
      txType: false,
      description: null
    });
  }

  public cancelEditMode() : void {
    this.entryForm.patchValue({
      ledgerName: null,
      ledgerId: null,
      lineAmount: null,
      txType: false,
      description: null
    });

    this.selectedRowIndex = 0; //Reset to original state.
    this.selectedLedger = {}; // Reset to original state.
    this.isEntryEditModeEnabled = false;
  }

  //This will also executed in edit of any added entry.
  onLedgerSelectionChange(selectedLedger : ILedger) : void {
    this.selectedLedger = selectedLedger;
  }

  addJounralEntry() : void {
    if(this.entryForm.valid) {      
      let ledgerDetailLines = this.journalForm.get("ledgerDetailLines")?.value;

      //Check the txType and add the amount in corresponding tx type.
      let debit : number = 0;
      let credit : number = 0;
      let enteredAmount : number = this.entryForm.controls["lineAmount"].value;
      if(this.entryForm.controls["txType"].value as boolean){
        credit = enteredAmount;
      }else{
        debit = enteredAmount;
      }

      if(this.isEntryEditModeEnabled) {

        this.selectedLedgerDetailLine["ledgerName"] = this.selectedLedger.name;
        this.selectedLedgerDetailLine["ledgerId"] = this.selectedLedger.id;
        this.selectedLedgerDetailLine["debit"] = debit;
        this.selectedLedgerDetailLine["credit"] = credit;
        this.selectedLedgerDetailLine["description"] = this.entryForm.controls["description"].value;

        this.selectedRowIndex = 0;
        this.isEntryEditModeEnabled = false; //Reset to add mode after Editing an entry.

      }else {
        //Push the entry into Journal Form Ledger detail line.
        ledgerDetailLines.push({
          id : this.entryRowId,
          jacksontype: 'LedgerDetailLineImpl',
          ledgerName: this.selectedLedger.name,
          ledgerId: this.selectedLedger.id,
          chequeDate: this.journalForm.controls["chequedate"].value,
          description: this.entryForm.controls["description"].value,
          debit: debit as number,
          credit: credit as number
        });

        //Incremented entryRowId for the next entry
        //This is used in ledgerDetailLines while adding entry.
        this.entryRowId++;
      }      

      //Calculate total credit and debit from ledger detail lines.
      this.calculateTotalAmounts();
    
      this.dataSource.data = this.journalForm.get("ledgerDetailLines")?.value as Array<ILedgerDetailLine>;       
      this.resetEntryForm();
    }    
  }

  calculateTotalAmounts() : void {
    let addedLedgerDetailLines = this.journalForm.get("ledgerDetailLines")?.value;

    let totalCredit : number = 0;
    let totalDebit : number = 0;
    if(addedLedgerDetailLines.length > 0) {

      addedLedgerDetailLines.forEach((_element: { [x: string]: string | number; }) => {
        totalCredit = +totalCredit +  +_element["credit"]
        totalDebit = +totalDebit +  +_element["debit"]
      });      
    }

    this.totalCredit = totalCredit;
    this.totalDebit = totalDebit;
  }

  prepareForEditEntryLine(): void {
    let addedLedgerDetailLines = this.journalForm.get("ledgerDetailLines")?.value;

    if(addedLedgerDetailLines.length > 0) {
      this.selectedLedgerDetailLine =  addedLedgerDetailLines.find((ledgerDetailLine: { id: number; }) => ledgerDetailLine.id == this.selectedRowIndex);

      let selectedLineAmount : number | undefined = 0;
      let selectedTxType : boolean = false;
      if(this.selectedLedgerDetailLine?.credit != 0){
        selectedLineAmount = this.selectedLedgerDetailLine?.credit;
        selectedTxType = true;
      }else {
        selectedLineAmount = this.selectedLedgerDetailLine?.debit;
        selectedTxType = false;
      }

      this.entryForm.patchValue({
        ledgerName: this.selectedLedgerDetailLine?.ledgerName,
        ledgerId: this.selectedLedgerDetailLine?.ledgerName,
        lineAmount: selectedLineAmount,
        txType: selectedTxType,
        description: this.selectedLedgerDetailLine?.description
      });

      this.isEntryEditModeEnabled = true;
    }
  }
  
  highlight(row : ILedgerDetailLine){
    this.selectedRowIndex = row.id || -1;
  }

  getEntryFormControl(name: string) {
    return this.entryForm.get(name) as FormControl;
  }

  saveJournalTx() : void {
    
    if(this.totalCredit != this.totalDebit) {      
      this._snackBar.open("Credit & Debit amount must be equal",'Close', {     
        duration: 2000
      });      
    }else {
      let addedLedgerDetailLines = this.journalForm.get("ledgerDetailLines")?.value;

      let ledgerDetailLinesForSave : Array<ILedgerDetailLine> = [];
      
      addedLedgerDetailLines.forEach((_element: any) => {
        let ledgerDetailLine = {
          jacksontype: "LedgerDetailLineImpl",
          chequeDate: this.journalForm.get("chequedate")?.value,
          chequeNo: this.journalForm.get("chequeNo")?.value,
          ledgerId: _element["ledgerId"],
          ledgerName: _element["ledgerName"],
          credit: _element["credit"],
          debit:  _element["debit"],
          description: _element["description"]
        }

        ledgerDetailLinesForSave.push(ledgerDetailLine);
      });

      let journalFormForSave = this.formBuilder.group({
        jacksontype: 'JournalTxImpl',
        transactiondate : this.journalForm.get("transactiondate")?.value,
        vouchernumber : this.journalForm.get("vouchernumber")?.value,        
        referenceNo: this.journalForm.get("referenceNo")?.value,        
        totalCredit: this.totalCredit,
        totalDebit: this.totalDebit,        
        ledgerDetailLines:  [ledgerDetailLinesForSave]
      });

      this.journalTxService.save(journalFormForSave.value).subscribe({
        next: (data) => {
          this.initalizeJournalForm();
          this.getNewVoucherNo();
        },  
        error: () => { }
      });

    }
    
  }
}
