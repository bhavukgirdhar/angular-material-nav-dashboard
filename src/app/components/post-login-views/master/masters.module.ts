import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MasterBaseViewComponent } from './master-base-view/master-base-view.component';
import { AllItemsComponent } from './items/all-items/all-items.component';
import { MastersRoutingModule } from './masters-routing.module';
import { ItemServiceService } from 'src/server/api/itemService.service';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UnitServiceService } from 'src/server/api/unitService.service';
import { ItemGroupServiceService } from 'src/server/api/itemGroupService.service';
import { LedgerGroupServiceService } from 'src/server/api/ledgerGroupService.service';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { TaxClassServiceService } from 'src/server/api/taxClassService.service';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { ItemGroupsComponent } from './item-groups/item-groups.component';
import { NewEditItemGroupComponent } from './item-groups/new-edit-item-group/new-edit-item-group.component';
import { NewItemComponent } from './items/new-item/new-item.component';
import { AllAttributesComponent } from './attributes/all-attributes/all-attributes.component';
import { AttributeServiceService } from 'src/server/api/attributeService.service';
import { NewEditAttributeComponent } from './attributes/new-edit-attribute/new-edit-attribute.component';
import { ChoiceListServiceService } from 'src/server/api/choiceListService.service';
import { AllAttributeGroupsComponent } from './attribute-groups/all-attribute-groups/all-attribute-groups.component';
import { AttributeGroupServiceService } from 'src/server/api/attributeGroupService.service';
import { NewEditAttributeGroupComponent } from './attribute-groups/new-edit-attribute-group/new-edit-attribute-group.component';


export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 0,
};

@NgModule({
  declarations: [
    MasterBaseViewComponent,
    AllItemsComponent, NewItemComponent, 
    ItemGroupsComponent, NewEditItemGroupComponent,
    AllAttributesComponent, NewEditAttributeComponent, 
    AllAttributeGroupsComponent, NewEditAttributeGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MastersRoutingModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [
    AttributeServiceService,
    AttributeGroupServiceService, 
    ChoiceListServiceService,
    ItemServiceService,
    UnitServiceService,
    ItemGroupServiceService,
    LedgerGroupServiceService,
    LedgerServiceService,
    TaxClassServiceService,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ],
  bootstrap: []
})
export class MastersModule { }
