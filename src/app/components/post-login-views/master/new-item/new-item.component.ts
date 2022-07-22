import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { GetObjectsArgument, IUnit } from 'src/server';
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

  availableItemUnits:  Observable<IUnit[]>;
  getAvailableUnitsByCriteria : GetObjectsArgument = {}
  autoCompleteItemUnit = new FormControl();

  constructor(private breakpointObserver: BreakpointObserver,private unitService :  UnitServiceService) { }

  ngOnInit(): void {
    this.getAvailableUnitsByCriteria.genericSearch = false;   
    this.availableItemUnits = this.autoCompleteItemUnit.valueChanges.pipe(startWith(''), switchMap(value => this._filterUnits(value)));
  }

  /**
   * This function filters the units on key input
   * @param value Searched String.
   * @returns 
   */
  private _filterUnits(value: string) : Observable<IUnit[]>{
    const filterValue = value.toLowerCase();
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
    this.availableItemUnits.pipe(
      map((data) => {
        return data!.filter(option => option.name!.toLowerCase().includes(filterValue))
      })
    ).subscribe((data) => {
      console.log(data[0].id);
    });
  }
}
