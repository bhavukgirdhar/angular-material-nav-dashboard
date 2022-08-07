import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { GetObjectsArgument, PItemMaster } from 'src/server';
import { ItemServiceService } from 'src/server/api/itemService.service';

@Component({
  selector: 'item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.css']
})
export class ItemBoxComponent implements OnInit {

  @Input("itemFormControl")
  autoCompleteInput : FormControl = new FormControl();

  @Output("onItemSelection") 
  onItemSelection = new EventEmitter<PItemMaster>();

  allItems : PItemMaster[];
  filteredItems:  Observable<PItemMaster[]>;

  getItemsByCriteria : GetObjectsArgument = {};  

  constructor(private itemServiceApi:  ItemServiceService) { }

  ngOnInit(): void {
    this.fetchItemsFromServer();
  }


  /**
   * This function is executed when we pass any default value in autoCompleteInput
   * This works in edit mode on page load **only**
   * @param changes 
   */
   ngOnChanges(changes: SimpleChanges): void {
    this.filteredItems = this.autoCompleteInput.valueChanges
          .pipe(startWith(this.autoCompleteInput.value), map(value => this._filterItems(value)));

    console.log("**** Item input has been changed *********");
  }

  private fetchItemsFromServer() {
    this.getItemsByCriteria.pageSize = 250;
    this.getItemsByCriteria.startPageIndex = 0;
    this.getItemsByCriteria.genericSearch = false;

    this.allItems = [];

    this.itemServiceApi.getPItemMasterList(this.getItemsByCriteria).subscribe({
      next: (data) => {
        if (!!data && data.count! > 0 && data.objects!.length > 0 && !!data.objects) {
            this.allItems =  data.objects;

          // Works in edit mode to display value in input field (by FormControl)
          // Only when the default value is being provided.
          // Not works when user select any item after page load.
          let itemInEditMode: PItemMaster[] = [];
          if (!!this.autoCompleteInput.value && this.autoCompleteInput.value.length > 0) {
            itemInEditMode = this._filterItems(this.autoCompleteInput.value);
            this.autoCompleteInput.setValue(itemInEditMode[0].name);
          }
        }
      },
      error: () => {}
    });
  }

  private _filterItems(value: string) : PItemMaster[]{
    const filterValue = !!value ? value.toLowerCase() : '';

    let items : PItemMaster[] = this.allItems;

    return items?.filter(option => option.name?.toLowerCase().includes(filterValue));    
  }

  public onItemSelectionChanged(event : MatAutocompleteSelectedEvent) {
    const filterValue = event.option.value.toLowerCase();

    let selectedItem =  this.allItems.find(option => option.name!.toLowerCase().includes(filterValue));

    if(!!selectedItem){
      this.onItemSelection.emit(selectedItem);
    }
  }

}
