import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { CashInHandComponent } from './cash-in-hand/cash-in-hand.component';
import { ReportsBaseViewComponent } from './reports-base-view/reports-base-view.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverstockReportComponent } from './overstock-report/overstock-report.component';
import { CashInHandReportServiceService } from 'src/server';
import { DayBookComponent } from './day-book/day-book.component';
import { LedgerBookComponent } from './ledger-book/ledger-book.component';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';

@NgModule({
  declarations: [ 
    ReportsBaseViewComponent,
    CashInHandComponent,
    OverstockReportComponent,
    DayBookComponent,
    LedgerBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ReportsRoutingModule,    
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule
  ],
  providers: [
    CashInHandReportServiceService,
    LedgerServiceService
  ],
  bootstrap: []
})
export class ReportsModule { }
