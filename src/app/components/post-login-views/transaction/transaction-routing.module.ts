import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionBaseViewComponent } from './transaction-base-view/transaction-base-view.component';
import { PaymentComponent } from './voucher/payment/payment.component';
import { ReceiptComponent } from './voucher/receipt/receipt.component';


const routes: Routes = [
    {
        path: '', component: TransactionBaseViewComponent,
        children: [
            { path: 'newVoucher/Payment', component: PaymentComponent},
            { path: 'newVoucher/Receipt', component: ReceiptComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }