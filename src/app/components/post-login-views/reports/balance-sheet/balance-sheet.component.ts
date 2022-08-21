import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { BalanceSheetReportArgument } from 'src/server';
import { BalanceSheetReportServiceService } from 'src/server/api/balanceSheetReportService.service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  public startDate!: FormControl;
  public endDate!: FormControl;
  public zeroBalrequired!: boolean;
  public ledgerrequired!: boolean;
  private balanceSheetReportInput: BalanceSheetReportArgument;

  columns : Object[];
  liabilitiesData : Object[];
  assetsData : Object[];


  constructor(private balancesheetReportService: BalanceSheetReportServiceService, private customDateAdapterService  : CustomDateAdapterService) { 
    let txDate = new Date();
    this.startDate = new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate()));
    this.endDate = new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate()));
    this.zeroBalrequired = false;
    this.ledgerrequired= false;
  }

  ngOnInit(): void {
    
    this.columns =  [
      {name: 'name', header: 'Name', css_class: 'text-left' },
      {name: 'balance', header: 'Balance', css_class: 'text-left'},
      {name: 'groupBalance', header: 'Group Balance' }
    ];

    this.liabilitiesData = [];
    this.assetsData = [];

    this.getBalancesheetReport();
  }
  getBalancesheetReport(): void {
    this.balanceSheetReportInput = {};
    
    this.balanceSheetReportInput.dateFrom = this.startDate.value;
    this.balanceSheetReportInput.dateTo = this.endDate.value;
    this.balanceSheetReportInput.showZeroBalanceAccounts = this.zeroBalrequired;
    this.balanceSheetReportInput.showOnlyLedgerGroups = this.ledgerrequired;
    console.log(this.balanceSheetReportInput);
    
    this.balancesheetReportService.getReportArg(this.balanceSheetReportInput)
    .subscribe({
      next: (data) => {          
       console.log(data);
      
      },
      error: () => { }
    });
  }

  
}
