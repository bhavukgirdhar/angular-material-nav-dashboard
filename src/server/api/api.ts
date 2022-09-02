export * from './cashInHandReportService.service';
import { BillingClassificationServiceService } from './billingClassificationService.service';
import { CashInHandReportServiceService } from './cashInHandReportService.service';
import { DayBookServiceService } from './dayBookService.service';
import { LedgerServiceService } from './ledgerService.service';
import { ItemServiceService } from "./itemService.service";
import { UnitServiceService } from "./unitService.service";
import { ItemGroupServiceService } from "./itemGroupService.service";
import { LedgerGroupServiceService } from "./ledgerGroupService.service";
import { LedgerAttributesServiceService } from "./ledgerAttributesService.service";
import { TaxClassServiceService } from "./taxClassService.service";
import { TaxGroupServiceService } from "./taxGroupService.service";
import { TaxableEntityServiceService } from "./taxableEntityService.service";
import { OverstockReportServiceService } from "./overstockReportService.service";
import { VoucherNumberServiceService } from "./voucherNumberService.service";
import { PaymentTxServiceService } from "./paymentTxService.service";
import { ReceiptTxServiceService } from "./receiptTxService.service";
import { JournalTxServiceService } from "./journalTxService.service";
import { BalanceSheetReportServiceService } from "./balanceSheetReportService.service";
import { StockLocationServiceService } from "./stockLocationService.service";
import { OtherChargesServiceService } from "./otherChargesService.service";
import { SaleOrderTxServiceService } from "./saleOrderTxService.service";
import { PurchaseOrderTxServiceService } from "./purchaseOrderTxService.service";
import { POTxServiceService } from "./pOTxService.service";


export const APIS = [BillingClassificationServiceService, CashInHandReportServiceService, DayBookServiceService, BalanceSheetReportServiceService, LedgerServiceService, ItemServiceService, UnitServiceService, 
    ItemGroupServiceService, LedgerGroupServiceService, LedgerAttributesServiceService , TaxClassServiceService, TaxGroupServiceService , TaxableEntityServiceService , OverstockReportServiceService,
    VoucherNumberServiceService,PaymentTxServiceService, ReceiptTxServiceService, JournalTxServiceService, StockLocationServiceService, OtherChargesServiceService, SaleOrderTxServiceService,
    PurchaseOrderTxServiceService, POTxServiceService];
