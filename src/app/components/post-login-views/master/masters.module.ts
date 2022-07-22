import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MasterBaseViewComponent } from './master-base-view/master-base-view.component';
import { AllItemsComponent } from './items/all-items/all-items.component';
import { MastersRoutingModule } from './masters-routing.module';
import { ItemServiceService } from 'src/server/api/itemService.service';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { ProgressSpinnerModule } from 'src/app/shared/modules/progress-spinner.module';
import { AppOverlayModule } from 'src/app/shared/modules/overlay.module';
import { NewItemComponent } from './new-item/new-item.component';
import { UnitServiceService } from 'src/server/api/unitService.service';


export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 0,
};

@NgModule({
  declarations: [
      MasterBaseViewComponent, 
      AllItemsComponent, NewItemComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MastersRoutingModule,
    ProgressSpinnerModule,
    AppOverlayModule
  ],
  providers: [
    ItemServiceService,
    UnitServiceService,
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
  bootstrap: []
})
export class MastersModule { }
