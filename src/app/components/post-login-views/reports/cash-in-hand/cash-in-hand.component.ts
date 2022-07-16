import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CashInHandDataSource } from './cash-in-hand-datasource';
import { CashInHandReportInput, CashInHandReportLine, CashInHandReportServiceService } from 'src/server';

@Component({
  selector: 'app-cash-in-hand',
  templateUrl: './cash-in-hand.component.html',
  styleUrls: ['./cash-in-hand.component.css']
})
export class CashInHandComponent implements OnInit, AfterViewInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CashInHandReportLine>;
  dataSource: CashInHandDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 
    'openingBalance', 
    'debit', 
    'credit',
    'todayBalance',
    'closingBalance'
  ];


  private cashInHandReportInput!: CashInHandReportInput;

  constructor(private breakpointObserver: BreakpointObserver, private cashInHandService : CashInHandReportServiceService) {
    this.dataSource = new CashInHandDataSource();
  }

  ngOnInit(): void {
    this.cashInHandReportInput = {};
    
    this.cashInHandReportInput.dateFrom = new Date();
    this.cashInHandReportInput.dateTo = new Date();

    this.cashInHandService.getReportArg(this.cashInHandReportInput)
      .subscribe({
        next: (data) => {
          this.table.dataSource = data?.reportLines || [];          
        },
        error: () => { }
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
