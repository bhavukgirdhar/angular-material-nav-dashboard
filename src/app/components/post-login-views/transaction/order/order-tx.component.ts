import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, shareReplay, Subscription } from "rxjs";
import { CustomDateAdapterService } from "src/app/services/date-adaptor";
import { IItemLine, IOtherCharges, IOtherChargesLine, ITaxGroup, ITaxLine, PItemMaster, PLedgerMaster } from "src/server";
import { LedgerServiceService } from "src/server/api/ledgerService.service";
import { TaxableEntityServiceService } from "src/server/api/taxableEntityService.service";
import { TransactionsProvider } from "src/app/services/transactionsProvider";
import { LedgerAttributesServiceService } from "src/server/api/ledgerAttributesService.service";
import { BillingClassificationServiceService } from "src/server/api/billingClassificationService.service";
import { MatTableDataSource } from "@angular/material/table";
import { StockLocationServiceService } from "src/server/api/stockLocationService.service";
import { OtherChargesServiceService } from "src/server/api/otherChargesService.service";
import { MatSnackBar } from "@angular/material/snack-bar";



export abstract class OrderTxComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  public orderTxForm!: FormGroup;
  public itemForm!: FormGroup; 
  public otherChargesDiscountForm! : FormGroup;
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
  selectedLineItemForEdit : IItemLine | undefined;
  itemLineEditMode : boolean = false;
  

  //Other Charges/Discount objects
  retrievedOtherCharges : IOtherCharges[] = []; // From server.
  addedOtherCharges : IOtherChargesLine[] = []; // Added by user.
  otherChargeValueSubscription : Subscription;
  otherChargesDataSource = new MatTableDataSource<IOtherChargesLine>([]);
  otherChargesDisplayedColumns = ['chargesName','value','amount'];
  selectedOtherChargeLineForEdit : IOtherChargesLine | undefined;
  otherChargeLineEditMode : boolean = false;
  

  itemLinesTotalAmount = new FormControl(0);
  otherChargesTotalAmount = new FormControl(0);
  netFinalAmount = new FormControl(0);
  receivedAmount = new FormControl(0); // value change is subsribed.
  returnAmount = new FormControl(0);
  
  constructor(private breakpointObserver: BreakpointObserver, private formBuilder : FormBuilder, 
    private customDateAdapterService  : CustomDateAdapterService, private ledgerService : LedgerServiceService,
    private stockLocationService : StockLocationServiceService, private taxableEntityService : TaxableEntityServiceService,
    private txProvider : TransactionsProvider, private ledgerAttributesService : LedgerAttributesServiceService,
    private billingClassificationService : BillingClassificationServiceService,
    private otherChargesService : OtherChargesServiceService,private _snackBar: MatSnackBar) { 
    
      this.receivedAmount.valueChanges.subscribe({
        next: (data) => {          
          if(data > this.netFinalAmount.value) {
            this.returnAmount.setValue(Number((data - this.netFinalAmount.value).toFixed(2)));
          }else{
            this.returnAmount.setValue(0);  
          }
        }
      });
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

        this.updateStockLocation();

        //Get billing group associated with Cash Ledger
        this.getBillingGroup(data.id);

        //Initialize the item form on load and other properties.
        this.initializeItemForm();
        this.itemLines = [];
        this.itemLinesDataSource.data = this.itemLines;

        // Inititalize the Other Charges Form and other properties.
        this.getOtherCharges();
        this.initializeOtherChargesDiscountForm();
        this.addedOtherCharges = [];
        this.otherChargesDataSource.data = this.addedOtherCharges;

        this.itemLinesTotalAmount.setValue(0);
        this.otherChargesTotalAmount.setValue(0);
        this.netFinalAmount.setValue(0);
        this.receivedAmount.setValue(0);
        this.returnAmount.setValue(0);

        this.isFormLoaded = true;
      },
      error: () => { }
    });
  }  
 

  /**
   * This function updates the stock location.
   */
  private updateStockLocation() {
    this.stockLocationService.getObjects().subscribe({
      next: (data) => {
        this.txProvider.stockLocation(data[0]);
      }
    });
  }

  /**
   * This function initializes the item form to default values.
   */
  private initializeItemForm() {

    this.itemForm = this.formBuilder.group({
      itemId: new FormControl(''),
      itemName: new FormControl(''),
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

  private getOtherCharges() {
    this.otherChargesService.getObjects().subscribe({
      next: (data) => {
        this.retrievedOtherCharges = data;
      }
    });
  }

  /**
   * This function initialize the other charges discount form.
   */
  private initializeOtherChargesDiscountForm() {
    this.otherChargesDiscountForm = this.formBuilder.group({      
      chargesId: new FormControl(''),
      chargesName: new FormControl(''),
      billAmount: new FormControl({ value: 0, disabled: true }),      
      discount: new FormControl(''),
      type: new FormControl(''),
      value : new FormControl(0),
      displayedValue : new FormControl(0),
      amount: new FormControl(0),
      displayedAmount: new FormControl(0)
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
      this.updateTaxGroupLinkedToItemAndTaxAmount(selectedItem.taxClassId,"ITEM");      
    }else{
      this.updateTaxAmount(undefined);
    }

    // Below are the value change subscribers which updates the form values.
    // Executed when the form field values are updated.
    this.itemSelectionChangeSubscribers(selectedItem);
  }

 

  private itemSelectionChangeSubscribers(selectedItem: PItemMaster) {

    this.itemForm.controls["quantity"].valueChanges.subscribe({
      next: (data) => {

        if(!!data) { // Don't update values if form is reset
          let rate = data * this.itemForm.controls["mrp"].value;
          let discount = this.itemForm.controls["discount"].value;
  
          rate = rate - ((rate * discount) / 100);
  
          this.itemForm.patchValue({
            rate: rate,
            taxableAmount: rate,
            taxableAmountBeforeBillDiscount: rate
          });
  
          if (!!this.itemForm.controls["taxGroup"].value) {
            // This patches the tax group id,name in item form which will be further used to calculate the tax amount.
            this.updateTaxGroupLinkedToItemAndTaxAmount(selectedItem.taxClassId, "ITEM");
          }
        }
        
      }
    });

    this.itemForm.controls["discount"].valueChanges.subscribe({
      next: (data) => {

        if(!!data) {// Don't update values if form is reset
          let rate = this.itemForm.controls["quantity"].value * this.itemForm.controls["mrp"].value;

          rate = rate - ((rate * data) / 100);
  
          this.itemForm.patchValue({
            rate: rate,
            taxableAmount: rate,
            taxableAmountBeforeBillDiscount: rate
          });
  
          if (!!this.itemForm.controls["taxGroup"].value) {
            // This patches the tax group id,name in item form which will be further used to calculate the tax amount.
            this.updateTaxGroupLinkedToItemAndTaxAmount(selectedItem.taxClassId, "ITEM");
          }
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
  private updateTaxGroupLinkedToItemAndTaxAmount(taxClassId: number | undefined, type: string) : void{

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
  private updateTaxAmount(taxGroup: ITaxGroup | undefined) {

    let taxableAmount = this.itemForm.controls["taxableAmount"].value;
    if (!!taxGroup) {
      //update tax amount.
      let taxAmount = this.calculateTaxAmount(taxableAmount, taxGroup);

      let totalAmount = taxAmount + taxableAmount;

      this.itemForm.patchValue({
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        totalAmountBeforeBillDiscount : totalAmount
      });
    }else{ // In case if selected item has no tax class.
      this.itemForm.patchValue({
        taxAmount: 0,
        totalAmount: taxableAmount,
        totalAmountBeforeBillDiscount : taxableAmount
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

  /**
   * This function is executed when user adds an item as item line from 'ADD ITEM' button.
   * Also executed when user edit an already added item line.
   */
  public addOrEditItemLine() : void {

    this.itemForm.controls["itemName"].addValidators([ Validators.required]);
    this.itemForm.controls["itemName"].updateValueAndValidity();

    if(this.itemForm.valid) {
      let itemLine : IItemLine = this.itemForm.getRawValue();      
      itemLine.jacksontype = 'ItemLineImpl';

      if(!this.itemLineEditMode) { //New Item Line added
        this.itemLines = [...this.itemLines, itemLine];
      }else{//Edit existing item line.
        this.itemLines = this.itemLines.map((iL) => {
          if(iL.itemId == itemLine.itemId) {
            iL = itemLine;
          }
          return iL;
        });

        this.itemLineEditMode = false;
        this.selectedLineItemForEdit = undefined;
      }

      this.updateItemLinesTotalAmount(); // Update the total item lines amount.
      this.updateOtherCharges(); // Update the total other charges amount and other charges lines.      
      this.updateNetFinalAmount();
        
      this.itemLinesDataSource.data = this.itemLines;
      this.itemForm.reset();

      this.itemForm.controls["itemName"].clearValidators();
      this.itemForm.controls["itemName"].updateValueAndValidity();
    }
       
  }


  /**
   * This function updates the item lines total amount displayed in Transaction summary 
   * and Other charges form.
   */
  updateItemLinesTotalAmount() {
    this.itemLinesTotalAmount.setValue(0);
    let itemLinesAmount = 0;

    this.itemLines.forEach((itemLine) => {
      itemLinesAmount = itemLinesAmount + itemLine.totalAmount!;
    });

    this.itemLinesTotalAmount.setValue(itemLinesAmount);
  }

  /**
   * This function is executed once a user click on Edit button.
   * The selected item line will be populated in the item form.
   */
  public editItemLine() : void{
    this.itemForm.patchValue({
      itemId: this.selectedLineItemForEdit?.itemId,
      itemName: this.selectedLineItemForEdit?.itemName,
      itemProductCode: this.selectedLineItemForEdit?.itemProductCode,
      quantity: this.selectedLineItemForEdit?.quantity,
      unit: this.selectedLineItemForEdit?.unit,
      unitName: this.selectedLineItemForEdit?.unitName,
      mrp: ((this.selectedLineItemForEdit?.rate! * 100) / (100-this.selectedLineItemForEdit?.discount!) / this.selectedLineItemForEdit?.quantity!),
      discount: this.selectedLineItemForEdit?.discount,
      rate: this.selectedLineItemForEdit?.rate,
      taxGroup: this.selectedLineItemForEdit?.taxGroup,
      taxGroupName: this.selectedLineItemForEdit?.taxGroupName,
      taxLines: this.selectedLineItemForEdit?.taxLines,
      taxableAmount: this.selectedLineItemForEdit?.taxableAmount,
      taxableAmountBeforeBillDiscount: this.selectedLineItemForEdit?.taxableAmountBeforeBillDiscount,
      taxAmount: this.selectedLineItemForEdit?.taxAmount,
      totalAmount: this.selectedLineItemForEdit?.totalAmount,
      totalAmountBeforeBillDiscount: this.selectedLineItemForEdit?.totalAmountBeforeBillDiscount
    });
    this.itemLineEditMode = true;
  }

  /**
   * This function delete the selected line item.
   */
  public deleteItemLine() : void{

  }

  /**
   * This function reset the item line form to its initial state.
   */
  public cancelAddItem() : void {
    this.selectedLineItemForEdit = undefined;
    this.initializeItemForm();
  }

  /**
   * This function set the line item for Edit.
   * Only set the selected item line not do edit.
   * @param row 
   */
  public setSelectedLineItem(row : IItemLine) : void {
    this.selectedLineItemForEdit = row;
  }


  /**
   * This function is executed when user changes the other charges/discount type.
   * value and amount is updated when user click on ADD button.
   */
  public changeOtherChargesType() : void{
    let selectedChargeId = this.otherChargesDiscountForm.controls["chargesId"].value;
    
    let selectedOtherCharge =  this.retrievedOtherCharges.find((otherCharge) => otherCharge.id == selectedChargeId);

    if(!!selectedOtherCharge) {
      console.log(selectedOtherCharge);

      this.otherChargesDiscountForm.patchValue({
        chargesName : selectedOtherCharge.name,
        billAmount : this.itemLinesTotalAmount.value,
        type : selectedOtherCharge.type,
        discount : selectedOtherCharge.discount
      });

      if(this.otherChargesDiscountForm.controls["type"].value == "PERCENT") {
        
        this.otherChargesDiscountForm.controls["displayedValue"].enable();
        this.otherChargesDiscountForm.controls["displayedAmount"].enable();

        let amount = this.otherChargesDiscountForm.controls["billAmount"].value * selectedOtherCharge.value!/100;

        this.otherChargesDiscountForm.patchValue({
          displayedValue : Math.abs(selectedOtherCharge.value!),          
          displayedAmount : Math.abs(amount)
        });

        // Subscribe for value change in displayed value control.
        this.addSubscriptionOnOtherChargeValue();


      } else if(this.otherChargesDiscountForm.controls["type"].value == "FIXED") {
        
        this.otherChargesDiscountForm.controls["displayedValue"].disable();
        this.otherChargesDiscountForm.controls["displayedAmount"].enable();

        this.otherChargesDiscountForm.patchValue({
          value : 0, 
          displayedValue : 0,
          displayedAmount : Math.abs(selectedOtherCharge.value!) 
        });
      }
    }

  }

  /**
   * This function add the subscription on other charge value if PERCENT type of other charge is selected.
   */
  private addSubscriptionOnOtherChargeValue() {
    this.otherChargeValueSubscription = this.otherChargesDiscountForm.controls["displayedValue"].valueChanges.subscribe({
      next: (data) => {
        console.log("Triggered value change subscribe");
        let amount = Math.abs(this.otherChargesDiscountForm.controls["billAmount"].value * data / 100);

        this.otherChargesDiscountForm.patchValue({
          displayedAmount: amount
        });
      }
    });
  }

  /**
   * This function is executed when user add or edit an other change line.
   * Only works on click of ADD button.
   */
  public addOrEditOtherChargesLine() : void {

    if(!!this.itemLines && this.itemLines.length == 0) {
      this._snackBar.open("Atleast one item is required",'Close', {
        duration: 2000
      });      
    } else {      
      
      let isDiscount = this.otherChargesDiscountForm.controls["discount"].value;
      let displayedValue = this.otherChargesDiscountForm.controls["displayedValue"].value;
      let displayedAmount = this.otherChargesDiscountForm.controls["displayedAmount"].value;

      if(isDiscount) {
        this.otherChargesDiscountForm.patchValue({
          value: displayedValue * -1,
          amount: displayedAmount * -1
        });
      }else{
        this.otherChargesDiscountForm.patchValue({
          value: displayedValue,
          amount: displayedAmount
        });
      }

      if(!this.otherChargeLineEditMode) { // New Other Charge Line Mode
        let iOtherChargeLine : IOtherChargesLine = {};

        iOtherChargeLine.jacksontype = "OtherChargesLineImpl";
        iOtherChargeLine.chargesId = this.otherChargesDiscountForm.controls["chargesId"].value;
        iOtherChargeLine.chargesName = this.otherChargesDiscountForm.controls["chargesName"].value;
        iOtherChargeLine.value = this.otherChargesDiscountForm.controls["value"].value;
        iOtherChargeLine.amount = this.otherChargesDiscountForm.controls["amount"].value;
  
        this.addedOtherCharges = [...this.addedOtherCharges, iOtherChargeLine];
      } else { // Edit Mode

        this.addedOtherCharges = this.addedOtherCharges.map((ocL) => {
          if(ocL.chargesId == this.otherChargesDiscountForm.controls["chargesId"].value) {
            ocL.chargesId = this.otherChargesDiscountForm.controls["chargesId"].value;
            ocL.chargesName = this.otherChargesDiscountForm.controls["chargesName"].value;
            ocL.value = this.otherChargesDiscountForm.controls["value"].value;
            ocL.amount = this.otherChargesDiscountForm.controls["amount"].value;
          }
          return ocL;
        });

        this.otherChargeLineEditMode = false;
        this.selectedOtherChargeLineForEdit = undefined;
      }

      if(!!this.otherChargeValueSubscription) {
        this.otherChargeValueSubscription.unsubscribe(); // Unsubscribe the subscription.
      }      
      this.updateOtherChargesTotalAmount();
      this.otherChargesDataSource.data = this.addedOtherCharges;
      this.otherChargesDiscountForm.reset();
    }
   
  }

  /** 
  * This function updates the already added other charges and total other charges amount in case if 
  *  - New item is added.
  *  - Existing item is modified
  */
  updateOtherCharges() {
    
    this.addedOtherCharges.map((otherCharge) =>{
      if(otherCharge.value != 0){
        otherCharge.amount = (otherCharge.value! * this.itemLinesTotalAmount.value)/100;
      }
    });

    this.updateOtherChargesTotalAmount();
  }

  /**
  * This function reset the other charge form in case if user select wrong or change mind.
  */
  public cancelOtherCharges() : void {
    this.selectedOtherChargeLineForEdit = undefined;
    this.otherChargesDiscountForm.reset();
  }

  /**
   * This function is executed when user click on EDIT button.
   * The values and visibility is updated in form group as per the selected other charge line.
   */
  public editOtherChargeLine() : void {

    // Get original other charge line to get type and discount value.
    let originalOtherCharge =  this.retrievedOtherCharges
      .find((otherCharge) => otherCharge.id == this.selectedOtherChargeLineForEdit?.chargesId);    
    
   this.otherChargesDiscountForm.patchValue({
    chargesId: this.selectedOtherChargeLineForEdit?.chargesId,
    chargesName: this.selectedOtherChargeLineForEdit?.chargesName,
    discount: originalOtherCharge?.discount,
    type: originalOtherCharge?.type,
    billAmount: this.itemLinesTotalAmount.value,
    value: this.selectedOtherChargeLineForEdit?.value,
    amount: this.selectedOtherChargeLineForEdit?.amount,
    displayedValue: Math.abs(this.selectedOtherChargeLineForEdit?.value!),
    displayedAmount: Math.abs(this.selectedOtherChargeLineForEdit?.amount!)
   }); 

   if(this.otherChargesDiscountForm.controls["type"].value == "PERCENT") {        
    this.otherChargesDiscountForm.controls["displayedValue"].enable();
    this.otherChargesDiscountForm.controls["displayedAmount"].enable();

    this.addSubscriptionOnOtherChargeValue(); // Adding subscription again as 
                                              // it was unsubscribed after addition of other charge line.

   }else{
    this.otherChargesDiscountForm.controls["displayedValue"].disable();
    this.otherChargesDiscountForm.controls["displayedAmount"].enable();
   }

   this.otherChargeLineEditMode = true;
  }

  public deleteOtherChargeLine() : void {

  }

  public setSelectedOtherChargeLine(row: IOtherChargesLine) : void {
    this.selectedOtherChargeLineForEdit = row;
    console.log(this.selectedOtherChargeLineForEdit);
  }

  /**
   * This function updates the total other charges added from Other Charge form.
   * Further updates the Net final amount.
   */
  private updateOtherChargesTotalAmount() : void{
    this.otherChargesTotalAmount.setValue(0);
    let otherChargesAmount = 0;

    this.addedOtherCharges.forEach((otherCharge) => {
      otherChargesAmount = Number((otherChargesAmount + otherCharge.amount!).toFixed(2));
    });

    this.otherChargesTotalAmount.setValue(otherChargesAmount);
    this.updateNetFinalAmount();
  }

  /**
   * This function updates the net final amount.
   */
  updateNetFinalAmount() {
    this.netFinalAmount.setValue(this.itemLinesTotalAmount.value + this.otherChargesTotalAmount.value);
  }

  getOrderFormControl(name: string) {
    return this.orderTxForm.get(name) as FormControl;
  }

  getItemFormControl(name: string) {
    return this.itemForm.get(name) as FormControl;
  }

  public abstract saveOrderTx() : void;
}
