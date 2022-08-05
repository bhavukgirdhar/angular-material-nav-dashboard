import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { TransactionBaseViewComponent } from './transaction-base-view/transaction-base-view.component';
import { PaymentComponent } from './voucher/payment/payment.component';
import { ReceiptComponent } from './voucher/receipt/receipt.component';


const routes: Routes = [
    {
        path: '', component: TransactionBaseViewComponent,
        children: [
            { path: 'newVoucher/Payment', component: PaymentComponent},
            { path: 'newVoucher/Receipt', component: ReceiptComponent},
            { path: 'journal', component: JournalComponent},
            { path: 'edit-journal/:journalId', component: JournalComponent},
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