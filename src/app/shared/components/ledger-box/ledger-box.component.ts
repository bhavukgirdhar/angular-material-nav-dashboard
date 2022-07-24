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


  @Input("ledgerName")
  ledgerName?: string;
  
  @Output("onLedgerSelection") 
  onLedgerSelection = new EventEmitter<ILedger>();


  autoCompleteInput = new FormControl();
  allLedgers : ILedger[];
  filteredLedgers:  Observable<ILedger[]>;

  getLedgersByCriteria : GetObjectsArgument = {}

  
  
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
          if(!!this.ledgerName && this.ledgerName.length > 0) {
            let ledgerInEditMode = this._filterLedgers(this.ledgerName);
            this.autoCompleteInput.setValue(ledgerInEditMode[0].name);
          }

          this.filteredLedgers = this.autoCompleteInput.valueChanges.pipe(startWith(this.ledgerName), map(value => this._filterLedgers(value)));
        }
      },
      error: () => {}
    });

    
  }

  private _filterLedgers(value: string) : ILedger[]{
    const filterValue = !!value ? value.toLowerCase() : '';

    return this.allLedgers?.filter(option => option.name?.toLowerCase().includes(filterValue));    
  }

  public onLedgerGroupSelectionChanged(event : MatAutocompleteSelectedEvent) {
    const filterValue = event.option.value.toLowerCase();

    let selectedLedger =  this.allLedgers.find(option => option.name!.toLowerCase().includes(filterValue));

    if(!!selectedLedger){
      this.onLedgerSelection.emit(selectedLedger);
    }
  }
}
