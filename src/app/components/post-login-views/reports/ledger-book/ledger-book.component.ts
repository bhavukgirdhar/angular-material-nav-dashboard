import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable } from 'rxjs';
import { GetObjectsArgument, ILedger } from 'src/server';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { tap, startWith, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ledger-book',
  templateUrl: './ledger-book.component.html',
  styleUrls: ['./ledger-book.component.css']
})
export class LedgerBookComponent implements OnInit {

  autoCompleteInput = new FormControl();

  allLedgers:  Observable<ILedger[]>;

  getLedgersByCriteria : GetObjectsArgument = {}

  constructor(private ledgerServiceApi : LedgerServiceService) { }

  ngOnInit(): void {
    this.getLedgersByCriteria.pageSize = 250
    this.getLedgersByCriteria.startPageIndex = 0;
    this.getLedgersByCriteria.genericSearch = false;   

    this.allLedgers = this.autoCompleteInput.valueChanges.pipe(startWith(''), switchMap(value => this._filterLedgers(value)));
  }

  private _filterLedgers(value: string) : Observable<ILedger[]>{
    const filterValue = value.toLowerCase();
    return this.ledgerServiceApi.getObjectsSearchArg(this.getLedgersByCriteria).pipe(
      filter(data => !!data),
      map((data) => {
        return data.objects!.filter(option => option.name!.toLowerCase().includes(filterValue))
      })
    )
  }

}
