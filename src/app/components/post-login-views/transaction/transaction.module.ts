import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionBaseViewComponent } from './transaction-base-view/transaction-base-view.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
    declarations: [
        TransactionBaseViewComponent,
        PaymentComponent
    ],
    imports: [
      CommonModule,    
      FormsModule,
      ReactiveFormsModule,  
      FlexLayoutModule,      
      SharedModule,
      AngularMaterialModule,
      TransactionRoutingModule
    ],
    providers: [      
    ],
    bootstrap: []
  })
  export class TransactionModule { }