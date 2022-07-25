import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetObjectsArgument, ILedger } from 'src/server';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { startWith, switchMap } from 'rxjs/operators';
import { filter, map, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'Ledger-Box',
  templateUrl: './ledger-box.component.html',
  styleUrls: ['./ledger-box.component.css']
})
export class LedgerBoxComponent implements OnInit {

  @Input("ledgerBoxTitle")
  ledgerBoxTitle? : string = "Ledger";

  @Input("filterLedgersByGroupNames")
  filterLedgersByGroupNames : string[];

  @Input("ledgerFormControl")
  autoCompleteInput : FormControl = new FormControl();
  
  @Output("onLedgerSelection") 
  onLedgerSelection = new EventEmitter<ILedger>();

  allLedgers : ILedger[];
  filteredLedgers:  Observable<ILedger[]>;

  getLedgersByCriteria : GetObjectsArgument = {};  
  
  constructor(private ledgerServiceApi : LedgerServiceService) { }

  ngOnInit(): void {
    this.getLedgersByCriteria.pageSize = 250
    this.getLedgersByCriteria.startPageIndex = 0;
    this.getLedgersByCriteria.genericSearch = false;   

    this.allLedgers = [];

    this.ledgerServiceApi.getObjectsSearchArg(this.getLedgersByCriteria).subscribe({
      next: (data) => {
        if(!!data && data.count! > 0 && data.objects!.length > 0 && !!data.objects) {
          this.allLedgers = data.objects;

          // Works in edit mode to display value in input field (by FormControl)
          let ledgerInEditMode : ILedger[] = [];
          if(!!this.autoCompleteInput.value && this.autoCompleteInput.value.length > 0) {
            ledgerInEditMode = this._filterLedgers(this.autoCompleteInput.value);
            this.autoCompleteInput.setValue(ledgerInEditMode[0].name);
          }

          this.filteredLedgers = this.autoCompleteInput.valueChanges.pipe(startWith(this.autoCompleteInput.value), map(value => this._filterLedgers(value)));

          // Return ledger object in case if ledgerName is provided
          // This works with default ledger name and in edit mode.         
          if(this.autoCompleteInput.value && this.autoCompleteInput.value.length > 0) {
            this.onLedgerSelection.emit(ledgerInEditMode[0]);
          }
                   
        }
      },
      error: () => {}
    });

    
  }

  private _filterLedgers(value: string) : ILedger[]{
    const filterValue = !!value ? value.toLowerCase() : '';

    let ledgers : ILedger[] = this.allLedgers;

    // In case if filter of ledgers is required by some ledger group names.
    if(!!this.filterLedgersByGroupNames && this.filterLedgersByGroupNames.length > 0) {
      ledgers =  this.allLedgers.filter((ledger) => !!ledger.ledgerGroupName && 
                      this.filterLedgersByGroupNames.includes(ledger.ledgerGroupName));
    }

    return ledgers?.filter(option => option.name?.toLowerCase().includes(filterValue));    
  }

  public onLedgerGroupSelectionChanged(event : MatAutocompleteSelectedEvent) {
    const filterValue = event.option.value.toLowerCase();

    let selectedLedger =  this.allLedgers.find(option => option.name!.toLowerCase().includes(filterValue));

    if(!!selectedLedger){
      this.onLedgerSelection.emit(selectedLedger);
    }
  }
}
