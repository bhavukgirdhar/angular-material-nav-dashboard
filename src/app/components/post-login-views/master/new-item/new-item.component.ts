import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { GetObjectsArgument, IItemGroup, ILedger, ILedgerGroup, ITaxClass, IUnit, PItem } from 'src/server';
import { ItemGroupServiceService } from 'src/server/api/itemGroupService.service';
import { ItemServiceService } from 'src/server/api/itemService.service';
import { LedgerGroupServiceService } from 'src/server/api/ledgerGroupService.service';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { TaxClassServiceService } from 'src/server/api/taxClassService.service';
import { UnitServiceService } from 'src/server/api/unitService.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  // Item Units and Search with auto-complete
  itemUnits:  Observable<IUnit[]>;
  getAvailableUnitsByCriteria : GetObjectsArgument = {};

  // Item Groups and Search with auto-complete
  itemGroups: IItemGroup[];
  filteredItemGroups : Observable<IItemGroup[]>;

  // Sale accounts with auto-complete
  ledgerGroups : ILedgerGroup[];
  saleAccounts : ILedger[];
  filteredSaleAccounts : Observable<ILedger[]>;

  // Purchase accounts with auto-complete
  purchaseAccounts : ILedger[];
  filteredPurchaseAccounts : Observable<ILedger[]>;

  // Tax Class with auto-complete
  taxClasses : ITaxClass[];
  filteredTaxClass : Observable<ITaxClass[]>;

  public itemForm!: FormGroup;
  item: PItem;

  constructor(private breakpointObserver: BreakpointObserver,private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder, 
    private unitService :  UnitServiceService,
    private itemService : ItemServiceService,
    private itemGroupService : ItemGroupServiceService,
    private ledgerGroupService : LedgerGroupServiceService,
    private ledgerService : LedgerServiceService,
    private taxClassService : TaxClassServiceService) { 
      
  }

  ngOnInit(): void {

    this.item = {};

    this.route.params.subscribe(params => {
      if (params['itemId']) {
          this.itemService.getPItemFromId(params['itemId']).subscribe({
              next: (data) => {
                this.item = data;
                this.initializeItemForm();
              },
              error: () =>{}
            }
          );
      }else {
        this.initializeItemForm();
      }
    });    
  }
  
  private initializeItemForm() {
    this.itemForm = this.formBuilder.group({
      id: [this.item.id],
      name: [this.item.name, Validators.required],
      productCode: [this.item.productCode],
      hsnCode: [this.item.hsnCode],
      unitId: [this.item.unitId, Validators.required],
      unitName: [this.item.unitName, Validators.required],
      mrp: [this.item.mrp],
      sellingPrice: [this.item.sellingPrice],
      minStock: [this.item.minStock],
      maxStock: [this.item.maxStock],
      openingStock: [this.item.openingStock],
      openingRate: [this.item.openingRate],
      groupId: [this.item.groupId, Validators.required],
      groupName: [this.item.groupName, Validators.required],
      taxClassId: [this.item.taxClassId],
      taxClassName: [this.item.taxClassName],
      ledgerPurchaseAccountId: [this.item.ledgerPurchaseAccountId, Validators.required],
      ledgerPurchaseAccount: [this.item.ledgerPurchaseAccount, Validators.required],
      ledgerSaleAccountId: [this.item.ledgerSaleAccountId, Validators.required],
      ledgerSaleAccount: [this.item.ledgerSaleAccount, Validators.required],
      maintainStock: [true],
      openingStockEditable: [true],
      service: [false]
    });

    this.getAvailableUnitsByCriteria.genericSearch = false; 
    //start with the value available in form i.e in New it will be null 
    //and Edit it will be searched with actual item unit  
    this.itemUnits = this.itemForm.controls["unitName"].valueChanges.pipe(startWith(this.itemForm.controls["unitName"].value), switchMap(value => this._filterUnits(value)));

    this.getItemGroups();
    this.getSalePurchaseAccounts();
    this.getTaxClasses();
  }

  /**
   * This function is executed when the item unit is selected
   * The selected unit displayname is used to get the selected unit ID to set in the FormGroup.
   * @param event 
   */
  public onUnitSelectionChanged(event : MatAutocompleteSelectedEvent) {    
    const filterValue = event.option.value.toLowerCase();

    this.itemUnits.pipe(
      map((data) => {
        return data!.filter(option => option.name!.toLowerCase().includes(filterValue))
      })
    ).subscribe((data) => {
      if(!!data) {
        this.itemForm.patchValue({
          unitId: data[0].id
        });     
      }      
    });
  }

  /**
   * This function is executed when the item group is selected
   * The selected unit displayname is used to get the selected unit ID to set in the FormGroup.
   * @param event 
   */
   public onItemGroupSelectionChanged(event : MatAutocompleteSelectedEvent) {    
    const filterValue = event.option.value.toLowerCase();

    let selectedItemGroup  = this.itemGroups.find((itemGroup) => itemGroup.name?.toLowerCase().includes(filterValue));

    if(!!selectedItemGroup){
      this.itemForm.patchValue({
        groupId: selectedItemGroup.id
      });
    }
  }

   /**
   * This function is executed when the Sale Account is selected
   * The selected unit displayname is used to get the selected unit ID to set in the FormGroup.
   * @param event 
   */
  public onSaleAccountSelectionChanged(event : MatAutocompleteSelectedEvent) {
    const filterValue = event.option.value.toLowerCase();

    let saleAccount  = this.saleAccounts.find((saleAccount) => saleAccount.name?.toLowerCase().includes(filterValue));

    if(!!saleAccount){
      this.itemForm.patchValue({
        ledgerSaleAccountId: saleAccount.id
      });
    }
  }

   /**
   * This function is executed when the purchase account is selected
   * The selected unit displayname is used to get the selected unit ID to set in the FormGroup.
   * @param event 
   */
  public onPurchaseAccountSelectionChanged(event : MatAutocompleteSelectedEvent) {
    const filterValue = event.option.value.toLowerCase();

    let purchaseAccount  = this.purchaseAccounts.find((itemGroup) => itemGroup.name?.toLowerCase().includes(filterValue));

    if(!!purchaseAccount){
      this.itemForm.patchValue({
        ledgerPurchaseAccountId: purchaseAccount.id
      });
    }
  }

   /**
   * This function is executed when the tax class is selected
   * The selected unit displayname is used to get the selected unit ID to set in the FormGroup.
   * @param event 
   */
  public onTaxClassSelectionChanged(event : MatAutocompleteSelectedEvent) {
    const filterValue = event.option.value.toLowerCase();

    let taxClass  = this.taxClasses.find((itemGroup) => itemGroup.name?.toLowerCase().includes(filterValue));

    if(!!taxClass){
      this.itemForm.patchValue({
        taxClassId: taxClass.id
      });
    }
  }

  /**
   * This function get all the available item groups
   * And bind the auto-complete textbox with the valueChanges event.
   */
  private getItemGroups() : void {
    this.itemGroupService.getObjects().subscribe({
      next: (data) => {          
         this.itemGroups = data;
         this.filteredItemGroups = this.itemForm.controls["groupName"].valueChanges.pipe(startWith(this.itemForm.controls["groupName"].value), map(value => this._filterItemGroups(value || '')));
      },
      error: () =>{ }
    });
  }

  
  private getSalePurchaseAccounts() : void {
    this.ledgerGroupService.getObjects().subscribe({
      next: (data) => {
        let purchaseAccountsLedgerGroup = data.find((ledgerGroup) => ledgerGroup.name == 'Purchase Accounts');
        let saleAccountsLedgerGroup = data.find((ledgerGroup) => ledgerGroup.name == 'Sale Accounts');

        if(!!purchaseAccountsLedgerGroup) {
          this.ledgerService.getLedgersFromGroup(purchaseAccountsLedgerGroup.id).subscribe({
            next: (data) => {
                this.purchaseAccounts = data;
                this.filteredPurchaseAccounts = this.itemForm.controls["ledgerPurchaseAccount"].valueChanges.pipe(startWith(this.itemForm.controls["ledgerPurchaseAccount"].value), map(value => this._filterPurchaseAccounts(value || '')));
            },
            error: () => {}
          });
        }

        if(!!saleAccountsLedgerGroup) {
          this.ledgerService.getLedgersFromGroup(saleAccountsLedgerGroup.id).subscribe({
            next: (data) => {
                this.saleAccounts = data;
                this.filteredSaleAccounts = this.itemForm.controls["ledgerSaleAccount"].valueChanges.pipe(startWith(this.itemForm.controls["ledgerSaleAccount"].value), map(value => this._filterSaleAccounts(value || '')));
            },
            error: () => {}
          });
        }
      },
      error: () => {}
    });
  }

  private getTaxClasses() : void {
    this.taxClassService.getObjects().subscribe({
      next: (data) => {
        this.taxClasses = data;
        this.filteredTaxClass = this.itemForm.controls["taxClassName"].valueChanges.pipe(startWith(this.itemForm.controls["taxClassName"].value), map(value => this._filterTaxClass(value || '')));
      },
      error: () => {}
    });
  }

  /**
   * This function filters the units on key input
   * @param value Searched String.
   * @returns 
   */
   private _filterUnits(value: string) : Observable<IUnit[]>{  
    
    //filter value will be null in new and actual value in edit mode.
    const filterValue = !!value ? value.toLowerCase() : '';
    this.getAvailableUnitsByCriteria.nameSearchText = filterValue;

    // Set the unit id as null when no unit is selected.
    if(filterValue.length == 0){
      this.itemForm.patchValue({
        unitId: null
      });
    }

    return this.unitService.getObjectsSearchArg(this.getAvailableUnitsByCriteria).pipe(
      filter(data => !!data),
      map((data) => {
        return data.objects!.filter(option => option.name!.toLowerCase().includes(filterValue))
      })
    )
  }

  /**
   * This function is executed when user enters any text for searching item groups.
   * The input element is bind with valueChanges event in function getItemGroups()
   * @param value User Input
   * @returns 
   */
   private _filterItemGroups(value: string): IItemGroup[] {

    //filter value will be null in new and actual value in edit mode.
    const filterValue = !!value ? value.toLowerCase() : '';

    if(filterValue.length == 0) {
      this.itemForm.patchValue({
        groupId: null
      });
    }
    return this.itemGroups.filter(option => option.name!.toLowerCase().includes(filterValue));
  }


  private _filterSaleAccounts(value: string): IItemGroup[] {
    
    //filter value will be null in new and actual value in edit mode.
    const filterValue = !!value ? value.toLowerCase() : '';

    if(filterValue.length == 0) {
      this.itemForm.patchValue({
        ledgerSaleAccountId: null
      });
    }
        
    return this.saleAccounts.filter(option => option.name!.toLowerCase().includes(filterValue));
  }

  private _filterPurchaseAccounts(value: string): IItemGroup[] {
    
    //filter value will be null in new and actual value in edit mode.
    const filterValue = !!value ? value.toLowerCase() : '';

    if(filterValue.length == 0) {
      this.itemForm.patchValue({
        ledgerPurchaseAccountId: null
      });
    }
      
    return this.purchaseAccounts.filter(option => option.name!.toLowerCase().includes(filterValue));
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

  public viewAllItems() : void {
    this.router.navigate(['main/master/allItems']);
  }

  public saveItem() : void {    
    if(this.itemForm.valid) {
      this.itemService.savePItem(this.itemForm.value).subscribe({
        next: (data) => {
          this.viewAllItems();
        },
        error: () => {}
      });
    }    
  }
}
