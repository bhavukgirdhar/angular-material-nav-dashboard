import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { GetObjectsArgument, IItemGroup, IUnit } from 'src/server';
import { ItemGroupServiceService } from 'src/server/api/itemGroupService.service';
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

  itemUnits:  Observable<IUnit[]>;
  getAvailableUnitsByCriteria : GetObjectsArgument = {}
  autoCompleteItemUnit = new FormControl();

  itemGroups: IItemGroup[];
  filteredItemGroups : Observable<IItemGroup[]>;
  autoCompleteItemGroup = new FormControl();

  public itemForm!: FormGroup;

  constructor(private breakpointObserver: BreakpointObserver,private formBuilder: FormBuilder, 
    private unitService :  UnitServiceService,
    private itemGroupService : ItemGroupServiceService) { }

  ngOnInit(): void {

    this.itemForm = this.formBuilder.group({      
      unitId: [null, [Validators.required]]      
    });

    this.getAvailableUnitsByCriteria.genericSearch = false;   
    this.itemUnits = this.autoCompleteItemUnit.valueChanges.pipe(startWith(''), switchMap(value => this._filterUnits(value)));

    this.getItemGroups();
    this.filteredItemGroups = this.autoCompleteItemGroup.valueChanges.pipe(startWith(''), map(value => this._filterItemGroups(value || '')));
  }

  /**
   * This function filters the units on key input
   * @param value Searched String.
   * @returns 
   */
  private _filterUnits(value: string) : Observable<IUnit[]>{    
    const filterValue = value.toLowerCase();
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
      this.itemForm.patchValue({
        unitId: data[0].id
      });     
    });
  }

  private getItemGroups() : void {
    this.itemGroupService.getObjects().subscribe({
      next: (data) => {          
         this.itemGroups = data;
         this.filteredItemGroups = this.autoCompleteItemGroup.valueChanges.pipe(startWith(''), map(value => this._filterItemGroups(value || '')));
      },
      error: () =>{ }
    });
  }

  private _filterItemGroups(value: string): IItemGroup[] {
    const filterValue = value.toLowerCase();
    return this.itemGroups.filter(option => option.name!.toLowerCase().includes(filterValue));
  }
}
