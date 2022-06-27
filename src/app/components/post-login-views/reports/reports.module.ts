import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { CashInHandComponent } from './cash-in-hand/cash-in-hand.component';
import { ReportsBaseViewComponent } from './reports-base-view/reports-base-view.component';

@NgModule({
  declarations: [ 
    ReportsBaseViewComponent,
    CashInHandComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReportsRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class ReportsModule { }
