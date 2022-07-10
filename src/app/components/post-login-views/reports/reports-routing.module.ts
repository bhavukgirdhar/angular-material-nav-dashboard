import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashInHandComponent } from './cash-in-hand/cash-in-hand.component';
import { OverstockReportComponent } from './overstock-report/overstock-report.component';
import { ReportsBaseViewComponent } from './reports-base-view/reports-base-view.component';


const routes: Routes = [
    {
        path: '', component: ReportsBaseViewComponent,
        children: [
            { path: 'cashInHand', component: CashInHandComponent},
            { path: 'overStockReport', component: OverstockReportComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }