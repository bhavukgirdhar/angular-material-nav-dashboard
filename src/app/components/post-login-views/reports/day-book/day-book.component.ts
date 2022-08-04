import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DayBookGridLine } from 'src/app/models/DayBookGridLine';
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

  columns = [
    {name: 'date', header: 'Date', css_class: 'text-left' },
    {name: 'ledger', header: 'Ledger', css_class: 'text-left'},
    {name: 'type', header: 'Type' },
    {name: 'voucherNo', header: 'Voucher No.' },
    {name: 'details', header: 'Details', css_class: 'text-left' },
    {name: 'debit', header: 'Debit', css_class: 'text-right' },
    {name: 'credit', header: 'Credit', css_class: 'text-right'}
  ];

  //Parent data will have  parent = 0
  data : Object[];

  public inputModel : DayBookReportArgument;

  constructor(private breakpointObserver: BreakpointObserver, private dayBookService : DayBookServiceService) { }

  ngOnInit(): void {
    this.inputModel = {};   
    this.inputModel.from = new Date();
    this.inputModel.to = new Date(); 
    this.inputModel.isShowCashTx = true;
    this.inputModel.format = "Detailed";

    this.data = [];

    this.getDayBookReport();
  }


  getDayBookReport() : void {
    this.dayBookService.getReportArg(this.inputModel).subscribe({
      next: (data) => {
        if(data.dayBookList && data.dayBookList.length > 0) {
          this.prepareTreeGridData(data.dayBookList);
        }        
      },
      error: () => {}
    });
  }

  private prepareTreeGridData(dayBookData : Array<DayBook>) : void {

    this.data = [];

    let rowData : Array<DayBookGridLine> = [];

    dayBookData.forEach((dayData) => {
       if(dayData.reportLines) {
          
         dayData.reportLines.forEach((reportLine) => {
          let parentLine : DayBookGridLine = {};

          parentLine.id = reportLine.type + "-" + reportLine.voucherNumber;
          parentLine.parent = "0";
          parentLine.type = reportLine.type;
          parentLine.voucherNo = reportLine.voucherNumber;
          parentLine.date = new Date(Number(reportLine.transactionDate)).toLocaleDateString();
          parentLine.ledger = reportLine.ledgerString;
          parentLine.details = reportLine.description;          
          parentLine.credit = reportLine.credit;
          parentLine.debit = reportLine.debit;

          rowData.push(parentLine);

          if(reportLine.detailLines){
              reportLine.detailLines.forEach((detailLine, index : number) => {
                let childLine : DayBookGridLine = {};

                childLine.id = parentLine.type + "-" + (Math.floor((Math.random() * 10000) + 1)).toString();
                childLine.parent = parentLine.id;                
                                 
                childLine.ledger = detailLine.ledgerString;
                childLine.details = detailLine.description;
                childLine.credit = detailLine.credit;
                childLine.debit = detailLine.debit;
                
                
                rowData.push(childLine);                
              });
          }

         });

       }
    });
    
    this.data = rowData;
  }
}