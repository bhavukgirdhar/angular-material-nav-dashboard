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
  public zeroBalrequired!: boolean;
  public ledgerrequired!: boolean;
  private balanceSheetReportInput: BalanceSheetReportArgument;
  dataSource: any;

  constructor(private balancesheetReportService: BalanceSheetReportServiceService) { 
    this.startDate = new Date();
    this.endDate = new Date();
    this.zeroBalrequired = false;
    this.ledgerrequired= false;
  }

  ngOnInit(): void {
    this.getBalancesheetReport();
  }
  getBalancesheetReport(): void {
    this.balanceSheetReportInput = {};
    
    this.balanceSheetReportInput.dateFrom = this.startDate;
    this.balanceSheetReportInput.dateTo = this.endDate;
    this.balanceSheetReportInput.showZeroBalanceAccounts = this.zeroBalrequired;
    this.balanceSheetReportInput.showOnlyLedgerGroups = this.ledgerrequired;
    console.log(this.balanceSheetReportInput);
    
    this.balancesheetReportService.getReportArg(this.balanceSheetReportInput)
    .subscribe({
      next: (data) => {          
       console.log(data);
      this.dataSource.data = data.assetsReportLines || [];
      },
      error: () => { }
    });
  }

  
}
