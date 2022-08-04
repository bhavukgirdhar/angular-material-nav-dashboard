export * from './cashInHandReportService.service';
import { CashInHandReportServiceService } from './cashInHandReportService.service';
import { DayBookServiceService } from './dayBookService.service';
import { LedgerServiceService } from './ledgerService.service';
import { ItemServiceService } from "./itemService.service";
import { UnitServiceService } from "./unitService.service";
import { ItemGroupServiceService } from "./itemGroupService.service";
import { LedgerGroupServiceService } from "./ledgerGroupService.service";
import { TaxClassServiceService } from "./taxClassService.service";
import { OverstockReportServiceService } from "./overstockReportService.service";
import { VoucherNumberServiceService } from "./voucherNumberService.service";
import { PaymentTxServiceService } from "./paymentTxService.service";
import { ReceiptTxServiceService } from "./receiptTxService.service";
import { JournalTxServiceService } from "./journalTxService.service";
import { BalanceSheetReportServiceService } from "./balanceSheetReportService.service";

export const APIS = [CashInHandReportServiceService, DayBookServiceService, BalanceSheetReportServiceService, LedgerServiceService, ItemServiceService, UnitServiceService, 
    ItemGroupServiceService, LedgerGroupServiceService, TaxClassServiceService, OverstockReportServiceService,
    VoucherNumberServiceService,PaymentTxServiceService, ReceiptTxServiceService, JournalTxServiceService];
