import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { CashInHandComponent } from './cash-in-hand/cash-in-hand.component';
import { ReportsBaseViewComponent } from './reports-base-view/reports-base-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverstockReportComponent } from './overstock-report/overstock-report.component';
import { CashInHandReportServiceService } from 'src/server';
import { DayBookComponent } from './day-book/day-book.component';
import { LedgerBookComponent } from './ledger-book/ledger-book.component';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { OverstockReportServiceService } from 'src/server/api/overstockReportService.service';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import {AgGridModule} from 'ag-grid-angular';
import { BalanceSheetReportServiceService } from 'src/server/api/balanceSheetReportService.service';
@NgModule({
  declarations: [ 
    ReportsBaseViewComponent,
    CashInHandComponent,
    OverstockReportComponent,
    DayBookComponent,
    LedgerBookComponent,
    BalanceSheetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    ReportsRoutingModule,  
    FlexLayoutModule,
    SharedModule,
    AngularMaterialModule,
    AgGridModule
  ],
  providers: [
    CashInHandReportServiceService,
    LedgerServiceService,
    OverstockReportServiceService,
    BalanceSheetReportServiceService
  ],
  bootstrap: []
})
export class ReportsModule { }
