import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllItemsComponent } from './items/all-items/all-items.component';
import { MasterBaseViewComponent } from './master-base-view/master-base-view.component';

const routes: Routes = [
    {
        path: '', component: MasterBaseViewComponent,
        children: [
            { path: 'allItems', component: AllItemsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MastersRoutingModule { }