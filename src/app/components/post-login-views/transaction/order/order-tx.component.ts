import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, shareReplay } from "rxjs";
import { CustomDateAdapterService } from "src/app/services/date-adaptor";
import { PItemMaster, PLedgerMaster } from "src/server";
import { LedgerServiceService } from "src/server/api/ledgerService.service";


export class OrderTxComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  public orderTxForm!: FormGroup;
  public itemForm!: FormGroup; 

  public headerTitle : string;
  isFormLoaded : boolean = false;

  
  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder, 
    private customDateAdapterService  : CustomDateAdapterService, private ledgerService : LedgerServiceService) { 
    
  }
  

  initializeOrderTxForm() : void {

    //To fetch the cash ledger as a default ***by ledger***
    this.ledgerService.getCashLedger().subscribe({
      next: (data) => {
        this.orderTxForm = this.formBuilder.group({
          transactiondate : new FormControl(this.customDateAdapterService.createDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())),
          vouchernumber : new FormControl( {value: '', disabled: true}, [ Validators.required]),
          referenceNo: new FormControl(''),
          ledgerId: new FormControl(data.id),
          ledgerName: new FormControl(data.name),
          billName: new FormControl(data.name)          
        });

        this.itemForm = this.formBuilder.group({
          itemId: new FormControl(''),
          itemName: new FormControl(''),
          productCode: new FormControl( {value: '', disabled: true}),
          quantity: new FormControl(''),
          unitId: new FormControl(''),
          unitName: new FormControl({value: '', disabled: true}),
          mrp: new FormControl({value: '', disabled: true}),          
        });

        this.isFormLoaded = true;
      },
      error: () => { }
    });
    

    
  }

  getOrderFormControl(name: string) {
    return this.orderTxForm.get(name) as FormControl;
  }

  getItemFormControl(name: string) {
    return this.itemForm.get(name) as FormControl;
  }

  //This will also executed in edit of any new added entry only.
  onLedgerSelectionChange(selectedLedger : PLedgerMaster) : void {
    this.orderTxForm.patchValue({
      ledgerName: selectedLedger.name,
      ledgerId: selectedLedger.id
    })
  }


  onItemSelectionChange(selectedItem: PItemMaster) {

    console.log(selectedItem);

    this.itemForm.patchValue({
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      quantity : 1,
      productCode: selectedItem.productCode,
      unitId: selectedItem.unitId,
      unitName: selectedItem.unitName,
      mrp: selectedItem.mrp
    });
  }
}
