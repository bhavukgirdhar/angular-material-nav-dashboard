import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetObjectsArgument, PLedgerMaster } from 'src/server';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { startWith } from 'rxjs/operators';
import { map, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'Ledger-Box',
  templateUrl: './ledger-box.component.html',
  styleUrls: ['./ledger-box.component.css']
})
export class LedgerBoxComponent implements OnInit, OnChanges {

  @Input("ledgerBoxTitle")
  ledgerBoxTitle? : string = "Ledger";

  @Input("filterLedgersByGroupNames")
  filterLedgersByGroupNames : string[];

  @Input("ledgerFormControl")
  autoCompleteInput : FormControl = new FormControl();
  
  @Output("onLedgerSelection") 
  onLedgerSelection = new EventEmitter<PLedgerMaster>();

  allLedgers : PLedgerMaster[];
  filteredLedgers:  Observable<PLedgerMaster[]>;

  getLedgersByCriteria : GetObjectsArgument = {};  
  
  constructor(private ledgerServiceApi : LedgerServiceService) { }

  ngOnInit(): void {    
    this.fetchLedgersFromServer();
  }

  /**
   * This function is executed when we pass any default value in autoCompleteInput
   * This works in edit mode on page load **only**
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.filteredLedgers = this.autoCompleteInput.valueChanges
          .pipe(startWith(this.autoCompleteInput.value), map(value => this._filterLedgers(value)));

    console.log("**** Ledger input has been changed *********");
  }

  private fetchLedgersFromServer() {
    this.getLedgersByCriteria.pageSize = 250;
    this.getLedgersByCriteria.startPageIndex = 0;
    this.getLedgersByCriteria.genericSearch = false;

    this.allLedgers = [];

    this.ledgerServiceApi.getPLedgerMasterList(this.getLedgersByCriteria).subscribe({
      next: (data) => {
        if (!!data && data.count! > 0 && data.objects!.length > 0 && !!data.objects) {
          this.allLedgers = data.objects;

          // Works in edit mode to display value in input field (by FormControl)
          // Only when the default value is being provided.
          // Not works when user select any ledger after page load.
          let ledgerInEditMode: PLedgerMaster[] = [];
          if (!!this.autoCompleteInput.value && this.autoCompleteInput.value.length > 0) {
            ledgerInEditMode = this._filterLedgers(this.autoCompleteInput.value);
            this.autoCompleteInput.setValue(ledgerInEditMode[0].name);
          }

          this.filteredLedgers = this.autoCompleteInput.valueChanges.pipe(startWith(this.autoCompleteInput.value), map(value => this._filterLedgers(value)));

          // Return ledger object in case if ledgerName is provided
          // This works with default ledger name and in edit mode.         
          if (ledgerInEditMode.length == 1) {
            this.onLedgerSelection.emit(ledgerInEditMode[0]);
          }

        }
      },
      error: () => { }
    });
  }

  private _filterLedgers(value: string) : PLedgerMaster[]{
    const filterValue = !!value ? value.toLowerCase() : '';

    let ledgers : PLedgerMaster[] = this.allLedgers;

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
