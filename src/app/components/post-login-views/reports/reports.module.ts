import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';


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
import { BalanceSheetReportServiceService } from 'src/server/api/balanceSheetReportService.service';
import { DayBookServiceService } from 'src/server/api/dayBookService.service';
import { SaleRegisterComponent } from './sale-register/sale-register.component';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { ItemRegisterComponent } from './item-register/item-register.component';
import { VoucherNumberServiceService } from 'src/server/api/voucherNumberService.service';
import { ReceiptTxServiceService } from 'src/server/api/receiptTxService.service';
import { PaymentTxServiceService } from 'src/server/api/paymentTxService.service';
import { JournalTxServiceService } from 'src/server/api/journalTxService.service';
import { ItemServiceService } from 'src/server/api/itemService.service';
import { BillingClassificationServiceService } from 'src/server/api/billingClassificationService.service';
import { LedgerAttributesServiceService } from 'src/server/api/ledgerAttributesService.service';
import { TaxClassServiceService } from 'src/server/api/taxClassService.service';
import { TaxGroupServiceService } from 'src/server/api/taxGroupService.service';
import { TaxableEntityServiceService } from 'src/server/api/taxableEntityService.service';
import { TransactionsProvider } from 'src/app/services/transactionsProvider';
import { StockLocationServiceService } from 'src/server/api/stockLocationService.service';
import { OtherChargesServiceService } from 'src/server/api/otherChargesService.service';
import { SaleOrderTxServiceService } from 'src/server/api/saleOrderTxService.service';
import { PurchaseOrderTxServiceService } from 'src/server/api/purchaseOrderTxService.service';
import { POTxServiceService } from 'src/server/api/pOTxService.service';

@NgModule({
  declarations: [ 
    ReportsBaseViewComponent,    
    CashInHandComponent,
    OverstockReportComponent,
    DayBookComponent,
    LedgerBookComponent,
    BalanceSheetComponent,
    SaleRegisterComponent,
    PurchaseRegisterComponent,
    ItemRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    ReportsRoutingModule,  
    FlexLayoutModule,
    SharedModule,
    AngularMaterialModule
    
  ],
  providers: [
    CashInHandReportServiceService,
    DayBookServiceService,
    LedgerServiceService,
    OverstockReportServiceService,
    BalanceSheetReportServiceService,
    VoucherNumberServiceService,   
    ReceiptTxServiceService,
    PaymentTxServiceService,
    JournalTxServiceService,
    ItemServiceService,
    BillingClassificationServiceService,
    LedgerAttributesServiceService,
    TaxClassServiceService,
    TaxGroupServiceService,
    TaxableEntityServiceService,
    TransactionsProvider,
    StockLocationServiceService,
    OtherChargesServiceService,
    SaleOrderTxServiceService,
    PurchaseOrderTxServiceService,
    POTxServiceService   
  ],
  bootstrap: []
})
export class ReportsModule { }
