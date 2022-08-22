import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, shareReplay } from "rxjs";
import { CustomDateAdapterService } from "src/app/services/date-adaptor";
import { IItemLine, ITax, ITaxGroup, ITaxLine, PItemMaster, PLedgerMaster } from "src/server";
import { LedgerServiceService } from "src/server/api/ledgerService.service";
import { startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { TaxGroupServiceService } from "src/server/api/taxGroupService.service";
import { TaxableEntityServiceService } from "src/server/api/taxableEntityService.service";
import { TransactionsProvider } from "src/app/services/transactionsProvider";
import { LedgerAttributesServiceService } from "src/server/api/ledgerAttributesService.service";
import { BillingClassificationServiceService } from "src/server/api/billingClassificationService.service";
import { MatTableDataSource } from "@angular/material/table";


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


  //Item Line Table Objects
  itemLines : IItemLine[];
  itemLinesDataSource = new MatTableDataSource<IItemLine>([]);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  itemLineDisplayedColumns = ['itemProductCode', 
    'itemName', 
    'mrp', 
    'discount',
    'rate',
    'taxableAmount',
    'taxGroupName',
    'taxAmount',
    'totalAmount'
  ];
  selectedLineItemForEdit : IItemLine;

  
  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder, 
    private customDateAdapterService  : CustomDateAdapterService, private ledgerService : LedgerServiceService,
    private taxGroupService : TaxGroupServiceService, private taxableEntityService : TaxableEntityServiceService,
    private txProvider : TransactionsProvider, private ledgerAttributesService : LedgerAttributesServiceService,
    private billingClassificationService : BillingClassificationServiceService) { 
    
  }
  
  // This function is called from child components : sale, sale order and purchase.
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

        //Get billing group associated with Cash Ledger
        this.getBillingGroup(data.id);

        //Initialize the item form on load.
        this.initializeItemForm();

        this.itemLines = [];

        this.isFormLoaded = true;
      },
      error: () => { }
    });
  }

  /**
   * This function initializes the item form to default values.
   */
  private initializeItemForm() {

    this.itemForm = this.formBuilder.group({
      jacksontype: 'ItemLineImpl',
      itemId: new FormControl(''),
      itemName: new FormControl('', [ Validators.required]),
      itemProductCode: new FormControl({ value: '', disabled: true }),
      quantity: new FormControl(''),
      unit: new FormControl(''),
      unitName: new FormControl({ value: '', disabled: true }),
      mrp: new FormControl({ value: '', disabled: true }),
      discount: new FormControl(''),
      rate: new FormControl({ value: '', disabled: true }),
      taxGroup: new FormControl(''),
      taxGroupName: new FormControl(''),
      taxLines: [],
      taxableAmount: new FormControl({ value: '', disabled: true }),
      taxableAmountBeforeBillDiscount: new FormControl({ value: '', disabled: true }),
      taxAmount: new FormControl({ value: '', disabled: true }),
      totalAmount: new FormControl({ value: '', disabled: true }),            
      totalAmountBeforeBillDiscount: new FormControl({ value: '', disabled: true })
    });
  }

  /**
   * This function updates the billing classification and billing group for the current selected ledger.
   * @param ledgerId : Current selected ledger id.
   */
  private getBillingGroup(ledgerId : number | undefined) : void {
    this.ledgerAttributesService.findById(ledgerId).subscribe({
      next: (ledgerAttributes) => {

        let billingGroups = ledgerAttributes.billingGroupList?.filter((billingGroup) => {
          return billingGroup.transactionTypes?.some((txType) => txType.type == 301);
        });

        if(!!billingGroups && billingGroups.length > 0) {
          this.txProvider.billingGroup(billingGroups[0]);
        }            

        this.billingClassificationService.findById(ledgerAttributes.billingClassificationId).subscribe({
          next: (iBillingClassification) => {
            this.txProvider.billingClassification(iBillingClassification);            
          }
        });

      }
    });
  }

  //This will also executed in edit of any new added entry only.
  onLedgerSelectionChange(selectedLedger : PLedgerMaster) : void {
    this.orderTxForm.patchValue({
      ledgerName: selectedLedger.name,
      ledgerId: selectedLedger.id
    })

    //Update billing group and billing classification for the selected ledger.
    this.getBillingGroup(selectedLedger.id);
  }

  /**
   * This is executed when item is being selected while adding an item in the list.
   * @param selectedItem 
   */
  onItemSelectionChange(selectedItem: PItemMaster) {

    this.itemForm.patchValue({
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      mrp: selectedItem.mrp,
      quantity : 1,
      itemProductCode: selectedItem.productCode,
      discount : 0,
      unit: selectedItem.unitId,
      unitName: selectedItem.unitName     
    });  

    let rate = this.itemForm.controls["mrp"].value - ((this.itemForm.controls["mrp"].value * this.itemForm.controls["discount"].value)/100);

    this.itemForm.patchValue({
      rate: rate,
      taxableAmount: rate,
      taxableAmountBeforeBillDiscount: rate
    });
    
    if(!!selectedItem.taxClassId) {
      // This patches the tax group id,name in item form which will be further used to calculate the tax amount.
      this.updateTaxGroupLinkedToItemAndAmount(selectedItem.taxClassId,"ITEM");      
    }

    // Below are the value change subscribers which updates the form values.
    // Executed when the form field values are updated.
    this.itemForm.controls["quantity"].valueChanges.subscribe({
      next: (data) => {
        let rate = data * this.itemForm.controls["mrp"].value;
        let discount = this.itemForm.controls["discount"].value;

        rate = rate - ((rate*discount)/100);

        this.itemForm.patchValue({
          rate: rate,
          taxableAmount: rate,
          taxableAmountBeforeBillDiscount: rate
        });
        
        if(!!this.itemForm.controls["taxGroup"].value) {
          // This patches the tax group id,name in item form which will be further used to calculate the tax amount.
          this.updateTaxGroupLinkedToItemAndAmount(selectedItem.taxClassId,"ITEM");      
        }
      }
    });

    this.itemForm.controls["discount"].valueChanges.subscribe({
      next: (data) =>{
        let rate = this.itemForm.controls["quantity"].value * this.itemForm.controls["mrp"].value;

        rate = rate - ((rate*data)/100);

        this.itemForm.patchValue({
          rate: rate,
          taxableAmount: rate,          
          taxableAmountBeforeBillDiscount: rate
        });

        if(!!this.itemForm.controls["taxGroup"].value) {
          // This patches the tax group id,name in item form which will be further used to calculate the tax amount.
          this.updateTaxGroupLinkedToItemAndAmount(selectedItem.taxClassId,"ITEM");      
        }
      }
    });
  }

 

  /**
   * This function is executed when the tax class is selected
   * The selected tax class displayname is used to get the selected tax id to set in the FormGroup.
   * @param event 
  */
  public onTaxGroupSelectionChanged(selectedTaxGroup : ITaxGroup) {

    if(!!selectedTaxGroup){
      this.itemForm.patchValue({
        taxGroup: selectedTaxGroup.id,
        taxGroupName: selectedTaxGroup.displayName
      });

      this.updateTaxAmount(selectedTaxGroup); 
    }

  } 
  
  /**
   * This method updates the tax group linked to item when an item is being selected from the list.
   * Also updates the taxGroup id and name for calculating the tax amount
   */
  private updateTaxGroupLinkedToItemAndAmount(taxClassId: number | undefined, type: string) : void{

    this.taxableEntityService.getTaxGroup(this.txProvider.billingClassification().id, this.txProvider.billingGroup().id, taxClassId).subscribe({
      next: (taxGroup) => {
        if (taxGroup) {
          if (type == 'ITEM') {
            this.itemForm.patchValue({
              taxGroup: taxGroup.id,
              taxGroupName: taxGroup.displayName
            });

            this.updateTaxAmount(taxGroup);  
          }
        }
      }
    });  
  }  

  /**
   * This method executed in following conditions :
   * 1. When tax group, quantity , discount is changed (From subscribers on form control)   
   * @param taxGroup 
   */
  private updateTaxAmount(taxGroup: ITaxGroup) {
    if (!!taxGroup) {
      //update tax amount.
      let taxAmount = this.calculateTaxAmount(this.itemForm.controls["taxableAmount"].value, taxGroup);

      let totalAmount = taxAmount + this.itemForm.controls["taxableAmount"].value;

      this.itemForm.patchValue({
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        totalAmountBeforeBillDiscount : totalAmount
      });
    }
  }

  /**
   * This function calculate the tax on item which is being added/edited.
   * @param taxableAmount 
   * @param taxGroup 
   * @returns 
   */
  calculateTaxAmount(taxableAmount: number, taxGroup: ITaxGroup): number {

    let itemTaxLines = new Array();
    let taxAmount: number = 0;
    let taxList = taxGroup.taxList;

    if(!!taxList) {

      taxList.forEach(tax => {
        if (!tax.taxOnTax) {
          let taxLine: ITaxLine = { jacksontype: "TaxLineImpl" };
          taxLine.tax = tax.id;
          taxLine.value = tax.value;
  
          let taxLineAmount: number = 0;
          taxLineAmount = parseFloat((taxableAmount * (!!taxLine.value ? taxLine.value : 0) / 100).toFixed(2));
          taxLine.amount = taxLineAmount;
          taxAmount = taxAmount + taxLineAmount;
          itemTaxLines.push(taxLine);
  
          tax.taxOnTaxList?.forEach(taxOnTax => {
            let taxOnTaxLine: ITaxLine = { jacksontype: "TaxLineImpl" };
            taxOnTaxLine.tax = taxOnTax.id;
            taxOnTaxLine.value = taxOnTax.value;
  
            let taxOnTaxLineAmount: number = 0;
            taxOnTaxLineAmount = parseFloat((taxLineAmount * (!!taxOnTaxLine.value ? taxOnTaxLine.value : 0) / 100).toFixed(2));
  
            taxOnTaxLine.amount = taxOnTaxLineAmount;
            taxAmount = taxAmount + taxOnTaxLineAmount;
            itemTaxLines.push(taxOnTaxLine);
            taxLine.taxOnTaxLines?.push(taxOnTaxLine);
            taxOnTaxLine.primaryTaxLine = false;
            taxLine.taxOnTaxAmount = (!!taxLine.taxOnTaxAmount ? taxLine.taxOnTaxAmount : 0) + taxOnTaxLineAmount;
          });

        }
      });
  
  
      let taxAmountWithoutTaxOnTax: number = taxAmount;
      taxList.forEach(tax => {
        if (tax.taxOnTax) {
          let taxLine: ITaxLine = { jacksontype: "TaxLineImpl" };
          taxLine.tax = tax.id;
          taxLine.value = tax.value;
  
          let taxLineAmount: number = 0;
          taxLineAmount = parseFloat((taxAmountWithoutTaxOnTax * (!!taxLine.value ? taxLine.value : 0) / 100).toFixed(2));
          taxLine.amount = taxLineAmount;
          taxAmount = taxAmount + taxLineAmount;
          itemTaxLines.push(taxLine);
        }
      });  
      
      this.itemForm.patchValue({
        taxLines: itemTaxLines
      });
    }

    return taxAmount;
  }

  public addItemLine() : void {

    if(this.itemForm.valid) {
      let itemLine : IItemLine = this.itemForm.getRawValue();
      this.itemLines = [...this.itemLines, itemLine];
  
      this.itemLinesDataSource.data = this.itemLines;    
      this.initializeItemForm();
    }
   
  }

  public cancelAddItem() : void {
    this.initializeItemForm();
  }

  public setSelectedLineItem(row : IItemLine) : void {
    this.selectedLineItemForEdit = row;
  }

  getOrderFormControl(name: string) {
    return this.orderTxForm.get(name) as FormControl;
  }

  getItemFormControl(name: string) {
    return this.itemForm.get(name) as FormControl;
  }

  
}
