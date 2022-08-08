import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, shareReplay } from "rxjs";
import { CustomDateAdapterService } from "src/app/services/date-adaptor";
import { ITaxClass, PItemMaster, PLedgerMaster } from "src/server";
import { LedgerServiceService } from "src/server/api/ledgerService.service";
import { startWith, switchMap } from 'rxjs/operators';
import { TaxClassServiceService } from "src/server/api/taxClassService.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";


export class OrderTxComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  public orderTxForm!: FormGroup;
  public itemForm!: FormGroup; 
  taxClasses : ITaxClass[];
  filteredTaxClass : Observable<ITaxClass[]>;

  public headerTitle : string;
  isFormLoaded : boolean = false;

  
  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder, 
    private customDateAdapterService  : CustomDateAdapterService, private ledgerService : LedgerServiceService,
    private taxClassService : TaxClassServiceService) { 
    
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
          discount: new FormControl(''),
          netRate: new FormControl({value: '', disabled: true}),
          amountExcludingTax: new FormControl({value: '', disabled: true}),
          taxClassId: new FormControl(''),
          taxClassName: new FormControl(''),
          taxAmount: new FormControl({value: '', disabled: true}),
          totalAmount: new FormControl({value: '', disabled: true})
        });

        this.itemForm.controls["quantity"].valueChanges.subscribe({
          next: (data) => {
            let netRate = data * this.itemForm.controls["mrp"].value;
            this.itemForm.patchValue({
              netRate: netRate
            });
          }
        });

        this.getTaxClasses();
        this.isFormLoaded = true;
      },
      error: () => { }
    });
  }

  onItemSelectionChange(selectedItem: PItemMaster) {

    console.log(selectedItem);

    this.itemForm.patchValue({
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      mrp: selectedItem.mrp,
      quantity : 1,
      productCode: selectedItem.productCode,
      unitId: selectedItem.unitId,
      unitName: selectedItem.unitName,      
      taxClassId: selectedItem.taxClassId,
      taxClassName: selectedItem.taxClassName,
    });

    

  }

  private getTaxClasses() : void {    
    this.taxClassService.getObjects().subscribe({
      next: (data) => {
        this.taxClasses = data;
        this.filteredTaxClass = this.itemForm.controls["taxClassName"].valueChanges
            .pipe(startWith(this.itemForm.controls["taxClassName"].value), map(value => this._filterTaxClass(value || '')));
      },
      error: () => {}
    });    
  }

  //This will also executed in edit of any new added entry only.
  onLedgerSelectionChange(selectedLedger : PLedgerMaster) : void {
    this.orderTxForm.patchValue({
      ledgerName: selectedLedger.name,
      ledgerId: selectedLedger.id
    })
  }

  private _filterTaxClass(value: string): ITaxClass[] {
    
    //filter value will be null in new and actual value in edit mode.
    const filterValue = !!value ? value.toLowerCase() : '';

    if(filterValue.length == 0) {
      this.itemForm.patchValue({
        taxClassId: null
      });
    }

    return this.taxClasses.filter(option => option.name!.toLowerCase().includes(filterValue));
  }
 

  /**
   * This function is executed when the tax class is selected
   * The selected tax class displayname is used to get the selected tax id to set in the FormGroup.
   * @param event 
  */
  public onTaxClassSelectionChanged(event : MatAutocompleteSelectedEvent) {
    const filterValue = event.option.value.toLowerCase();

    let taxClass  = this.taxClasses.find((itemGroup) => itemGroup.name?.toLowerCase().includes(filterValue));

    if(!!taxClass){
      this.itemForm.patchValue({
        taxClassId: taxClass.id,
        taxClassName: taxClass.name
      });
    }
  }  

  getOrderFormControl(name: string) {
    return this.orderTxForm.get(name) as FormControl;
  }

  getItemFormControl(name: string) {
    return this.itemForm.get(name) as FormControl;
  }
}
