import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OverStockReportArgument, OverstockReportLine } from 'src/server';
import { OverstockReportServiceService } from 'src/server/api/overstockReportService.service';

@Component({
  selector: 'app-overstock-report',
  templateUrl: './overstock-report.component.html',
  styleUrls: ['./overstock-report.component.css']
})
export class OverstockReportComponent implements OnInit, AfterViewInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    displayedColumns = ['itemName',
    'currentStock', 
    'maxStock', 
    'unitDisplayName'
  ];
  public summaryDate!: Date;
  private overStockReportInput: OverStockReportArgument;

  dataSource = new MatTableDataSource<OverstockReportLine>([]);
  @ViewChild(MatPaginator) paginator :any = MatPaginator;


  constructor(private breakpointObserver: BreakpointObserver,private overstockReportService: OverstockReportServiceService) {
    this.summaryDate = new Date();
  }

  ngOnInit(): void {
    this.getOverstockReport();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getOverstockReport() : void{ 
    this.overStockReportInput = {};
    
    this.overStockReportInput.date = this.summaryDate;

    this.overstockReportService.getReportArg(this.overStockReportInput)
    .subscribe({
      next: (data) => {          
       console.log(data);
       this.dataSource.data = data.overstockReportLine || [];
      },
      error: () => { }
    }
  );

  }
}
