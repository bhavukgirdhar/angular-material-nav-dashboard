import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { TransactionBaseViewComponent } from './transaction-base-view/transaction-base-view.component';

const routes: Routes = [
    {
        path: '', component: TransactionBaseViewComponent,
        children: [
            { path: 'payment', component: PaymentComponent},
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule { }