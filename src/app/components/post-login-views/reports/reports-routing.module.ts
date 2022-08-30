import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { CashInHandComponent } from './cash-in-hand/cash-in-hand.component';
import { DayBookComponent } from './day-book/day-book.component';
import { ItemRegisterComponent } from './item-register/item-register.component';
import { LedgerBookComponent } from './ledger-book/ledger-book.component';
import { OverstockReportComponent } from './overstock-report/overstock-report.component';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { ReportsBaseViewComponent } from './reports-base-view/reports-base-view.component';
import { SaleRegisterComponent } from './sale-register/sale-register.component';


const routes: Routes = [
    {
        path: '', component: ReportsBaseViewComponent,
        children: [
            { path: 'cashInHand', component: CashInHandComponent},
            { path: 'overStockReport', component: OverstockReportComponent},
            { path: 'dayBook', component: DayBookComponent},
            { path: 'ledgerBook', component: LedgerBookComponent},
            { path: 'balanceSheet', component: BalanceSheetComponent},
            { path: 'saleRegister', component: SaleRegisterComponent},
            { path: 'purchaseRegister', component: PurchaseRegisterComponent},
            { path: 'itemRegister', component: ItemRegisterComponent},
            

        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }