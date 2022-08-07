import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { PurchaseComponent } from './order/purchase/purchase.component';
import { SaleOrderComponent } from './order/sale-order/sale-order.component';
import { SaleComponent } from './order/sale/sale.component';
import { TransactionBaseViewComponent } from './transaction-base-view/transaction-base-view.component';
import { PaymentComponent } from './voucher/payment/payment.component';
import { ReceiptComponent } from './voucher/receipt/receipt.component';


const routes: Routes = [
    {
        path: '', component: TransactionBaseViewComponent,
        children: [
            { path: 'newVoucher/Payment', component: PaymentComponent},
            { path: 'edit-payment/:paymentId', component: PaymentComponent},
            { path: 'newVoucher/Receipt', component: ReceiptComponent},
            { path: 'edit-receipt/:receiptId', component: ReceiptComponent},
            { path: 'journal', component: JournalComponent},
            { path: 'edit-journal/:journalId', component: JournalComponent},
            { path: 'newOrder/sale', component: SaleComponent},
            { path: 'newOrder/purchase', component: PurchaseComponent},
            { path: 'newOrder/saleOrder', component: SaleOrderComponent}
        ]
    },
    {
        path: 'editTx/:txType/:txId', component : TransactionBaseViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }