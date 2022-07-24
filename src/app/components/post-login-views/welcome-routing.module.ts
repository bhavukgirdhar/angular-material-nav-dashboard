import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
        path: '', component: WelcomeComponent,
        children: [
            { path: '', component: DashboardComponent },
            { 
                path: 'master',
                loadChildren: () => import(`./master/masters.module`).then(
                  module => module.MastersModule
                )
            },
            { 
                path: 'transaction',
                loadChildren: () => import(`./transaction/transaction.module`).then(
                  module => module.TransactionModule
                )
            },
            { 
                path: 'report',
                loadChildren: () => import(`./reports/reports.module`).then(
                  module => module.ReportsModule
                )
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WelcomeRoutingModule { }