import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OverStockReportArgument } from 'src/server';
import { OverstockReportServiceService } from 'src/server/api/overstockReportService.service';

@Component({
  selector: 'app-overstock-report',
  templateUrl: './overstock-report.component.html',
  styleUrls: ['./overstock-report.component.css']
})
export class OverstockReportComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public summaryDate!: Date;

  constructor(private breakpointObserver: BreakpointObserver,private overstockReportService: OverstockReportServiceService) {
    this.summaryDate = new Date();
  }

  ngOnInit(): void {
    this.getOverstockReport();
  }
  
  getOverstockReport() : void{

  }
}
