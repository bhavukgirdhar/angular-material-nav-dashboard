import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllItemsComponent } from './items/all-items/all-items.component';
import { MasterBaseViewComponent } from './master-base-view/master-base-view.component';
import { NewItemComponent } from './new-item/new-item.component';

const routes: Routes = [
    {
        path: '', component: MasterBaseViewComponent,
        children: [
            { path: 'allItems', component: AllItemsComponent },
            {path: 'newItem', component: NewItemComponent },
            {path: 'editItem/:itemId', component: NewItemComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MastersRoutingModule { }