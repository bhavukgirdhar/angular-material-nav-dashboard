import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DayBookGridLine } from 'src/app/models/DayBookGridLine';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { DayBook, DayBookReportArgument } from 'src/server';
import { DayBookServiceService } from 'src/server/api/dayBookService.service';

@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.css'],
})
export class DayBookComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  columns : Object[];

  //Parent data will have  parent = 0
  data : Object[];
  fromDate : Date;
  toDate : Date;

  public inputModel : DayBookReportArgument;
  public totalDebitAmount: number | undefined;
  public  totalCreditAmount: number | undefined;
  private selectedTxId : string;
  private selectedTxType : string;

  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private customDateAdapterService  : CustomDateAdapterService, private dayBookService : DayBookServiceService) { }

  ngOnInit(): void {
    this.fromDate  = new Date();
    this.toDate = new Date();
    
    this.inputModel = {};   
    this.inputModel.from = this.customDateAdapterService.createDate(this.fromDate.getFullYear(), this.fromDate.getMonth(), this.fromDate.getDate());
    this.inputModel.to = this.customDateAdapterService.createDate(this.toDate.getFullYear(), this.toDate.getMonth(), this.toDate.getDate());
    this.inputModel.isShowCashTx = true;
    this.inputModel.format = "Detailed";

    this.columns =  [
      {name: 'date', header: 'Date', css_class: 'text-left' },
      {name: 'ledger', header: 'Ledger', css_class: 'text-left'},
      {name: 'type', header: 'Type' },
      {name: 'voucherNo', header: 'Voucher No.' },
      {name: 'details', header: 'Details', css_class: 'text-left' },
      {name: 'debit', header: 'Debit', css_class: 'text-right' },
      {name: 'credit', header: 'Credit', css_class: 'text-right'}
    ];
    this.data = [];
    this.totalCreditAmount = 0;
    this.totalDebitAmount = 0;
    this.selectedTxId = "";

    this.getDayBookReport();
  }


  getDayBookReport() : void {

    this.inputModel.from = this.customDateAdapterService.createDate(this.fromDate.getFullYear(), this.fromDate.getMonth(), this.fromDate.getDate());
    this.inputModel.to = this.customDateAdapterService.createDate(this.toDate.getFullYear(), this.toDate.getMonth(), this.toDate.getDate());

    this.dayBookService.getReportArg(this.inputModel).subscribe({
      next: (data) => {
        if(data.dayBookList && data.dayBookList.length > 0) {
          this.prepareTreeGridData(data.dayBookList);
        }        
      },
      error: () => {}
    });
  }

  onRowSelection(event: any) : void {
    let selectedData : DayBookGridLine = event.data;
    let selectedTxIdType = '';

    if(selectedData.parent == "0") {
      selectedTxIdType = selectedData.id ? selectedData.id : '';       
    }else{
      selectedTxIdType = selectedData.parent ? selectedData.parent : '';
    }

    if(selectedTxIdType.length > 0 && selectedTxIdType.indexOf("-") != -1) {
      let splittedTxIdType = selectedTxIdType.split("-");

      this.selectedTxType = splittedTxIdType[0];
      this.selectedTxId = splittedTxIdType[1];

      
    }

  }

  onRowEdit() : void {
    this.router.navigate(['/main/transaction/editTx', this.selectedTxType, this.selectedTxId]);
  }

  private prepareTreeGridData(dayBookData : Array<DayBook>) : void {

    this.data = [];
    this.totalCreditAmount = 0;
    this.totalDebitAmount = 0;

    let rowData : Array<DayBookGridLine> = [];

    dayBookData.forEach((dayData) => {
       if(dayData.reportLines) {        
          
         dayData.reportLines.forEach((reportLine) => {
          let parentLine : DayBookGridLine = {};

          parentLine.id = reportLine.type + "-" + reportLine.transaction?.id; //To generate unique id
          parentLine.parent = "0";
          parentLine.type = reportLine.type;
          parentLine.voucherNo = reportLine.voucherNumber;
          parentLine.date = new Date(Number(reportLine.transactionDate)).toLocaleDateString();
          parentLine.ledger = reportLine.ledgerString;
          parentLine.details = reportLine.description;          
          parentLine.credit = reportLine.credit;
          parentLine.debit = reportLine.debit;

          this.totalCreditAmount = +(this.totalCreditAmount ? this.totalCreditAmount : 0) + +(reportLine.credit ? reportLine.credit : 0);
          this.totalDebitAmount = +(this.totalDebitAmount ? this.totalDebitAmount : 0) + +(reportLine.debit ? reportLine.debit : 0);


          rowData.push(parentLine);

          if(reportLine.detailLines){
              reportLine.detailLines.forEach((detailLine, index : number) => {
                let childLine : DayBookGridLine = {};

                childLine.id = parentLine.type + "-" + (Math.floor((Math.random() * 10000) + 1)).toString(); //To generate unique id
                childLine.parent = parentLine.id;                
                                 
                childLine.ledger = detailLine.ledgerString;
                childLine.details = detailLine.description;
                childLine.credit = detailLine.credit;
                childLine.debit = detailLine.debit;


                this.totalCreditAmount = +(this.totalCreditAmount ? this.totalCreditAmount : 0) + +(detailLine.credit ? detailLine.credit : 0);
                this.totalDebitAmount = +(this.totalDebitAmount ? this.totalDebitAmount : 0) + +(detailLine.debit ? detailLine.debit : 0);
                
                
                rowData.push(childLine);                
              });
          }

         });

       }
    });
    
    this.data = rowData;
  }
}