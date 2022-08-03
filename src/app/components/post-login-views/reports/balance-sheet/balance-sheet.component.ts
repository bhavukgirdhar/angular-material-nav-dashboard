import { Component, OnInit } from '@angular/core';
import { BalanceSheetReportArgument } from 'src/server';
import { BalanceSheetReportServiceService } from 'src/server/api/balanceSheetReportService.service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  public startDate!: Date;
  public endDate!: Date;
  private balanceSheetReportInput: BalanceSheetReportArgument;
  dataSource: any;

  constructor(private balancesheetReportService: BalanceSheetReportServiceService) { 
    this.startDate = new Date();
    this.endDate = new Date();
  }

  ngOnInit(): void {
    this.getBalancesheetReport();
  }
  getBalancesheetReport(): void {
    this.balanceSheetReportInput = {};
    
    this.balanceSheetReportInput.dateFrom = this.startDate;
    this.balanceSheetReportInput.dateTo = this.endDate;

    this.balancesheetReportService.getReportArg(this.balanceSheetReportInput)
    .subscribe({
      next: (data) => {          
       console.log(data);
       //this.dataSource.data = BalanceSheetReportLine || [];
      },
      error: () => { }
    });
  }

}
