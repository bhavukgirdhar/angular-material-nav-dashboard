import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { CashInHandReportInput, CashInHandReportLine, CashInHandReportServiceService } from 'src/server';

@Component({
  selector: 'app-cash-in-hand',
  templateUrl: './cash-in-hand.component.html',
  styleUrls: ['./cash-in-hand.component.css']
})
export class CashInHandComponent implements OnInit, AfterViewInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 
    'openingBalance', 
    'debit', 
    'credit',
    'todayBalance',
    'closingBalance'
  ];

  /** Below section for variables in search criteria */
  public startDate!: Date;
  public endDate!: Date;
  private cashInHandReportInput!: CashInHandReportInput;  

  public totalDebitAmount: number | undefined;
  public  totalCreditAmount: number | undefined;
  
  dataSource = new MatTableDataSource<CashInHandReportLine>([]);

  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  constructor(private breakpointObserver: BreakpointObserver, private cashInHandService : CashInHandReportServiceService) {   
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit(): void {    
   this.getCashInHandReport();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getCashInHandReport() : void {
    this.cashInHandReportInput = {};
    
    this.cashInHandReportInput.dateFrom = this.startDate;
    this.cashInHandReportInput.dateTo = this.endDate;

    this.cashInHandService.getReportArg(this.cashInHandReportInput)
      .subscribe({
        next: (data) => {          
          this.dataSource.data = data.reportLines || [];
          this.totalCreditAmount = data.totalCredit;  
          this.totalDebitAmount = data.totalCredit; 
        },
        error: () => { }
      }
    );
  }
}
