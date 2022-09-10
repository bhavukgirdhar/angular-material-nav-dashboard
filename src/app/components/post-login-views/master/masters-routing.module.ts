import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemGroupsComponent } from './item-groups/item-groups.component';
import { NewEditItemGroupComponent } from './item-groups/new-edit-item-group/new-edit-item-group.component';
import { AllItemsComponent } from './items/all-items/all-items.component';
import { MasterBaseViewComponent } from './master-base-view/master-base-view.component';
import { NewItemComponent } from './items/new-item/new-item.component';
import { AllAttributesComponent } from './attributes/all-attributes/all-attributes.component';
import { NewEditAttributeComponent } from './attributes/new-edit-attribute/new-edit-attribute.component';
import { AllAttributeGroupsComponent } from './attribute-groups/all-attribute-groups/all-attribute-groups.component';
import { NewEditAttributeGroupComponent } from './attribute-groups/new-edit-attribute-group/new-edit-attribute-group.component';

const routes: Routes = [
    {
        path: '', component: MasterBaseViewComponent,
        children: [
            { path: 'allItems', component: AllItemsComponent },
            { path: 'newItem', component: NewItemComponent },
            { path: 'editItem/:itemId', component: NewItemComponent },
            { path: 'allItemGroups', component: ItemGroupsComponent },
            { path: 'newItemGroup', component: NewEditItemGroupComponent },
            { path: 'editItemGroup/:itemGroupId', component: NewEditItemGroupComponent },
            { path: 'allAttributes', component: AllAttributesComponent },
            { path: 'newAttribute', component: NewEditAttributeComponent },
            { path: 'editAttribute/:attributeId', component: NewEditAttributeComponent },
            { path: 'allAttributeGroups', component: AllAttributeGroupsComponent },
            { path: 'newAttributeGroup', component: NewEditAttributeGroupComponent },
            { path: 'editAttributeGroup/:attributeGroupId', component: NewEditAttributeGroupComponent }            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MastersRoutingModule { }