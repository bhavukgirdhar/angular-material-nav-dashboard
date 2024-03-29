import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';
import { LedgerBoxComponent } from '../components/ledger-box/ledger-box.component';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { AngularMaterialModule } from './angular-material.module';
import { ITreeTableComponent } from '../components/i-tree-table/i-tree-table.component';
import { AngularTreeGridModule } from 'angular-tree-grid';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { IMatDatepickerComponent } from '../components/i-mat-datepicker/i-mat-datepicker.component';
import { ItemBoxComponent } from '../components/item-box/item-box.component';
import { TaxGroupBoxComponent } from '../components/tax-group-box/tax-group-box.component';
import { FormControlPipe } from '../pipes/form-control.pipe';
import { AppOverlayModule } from './overlay.module';



@NgModule({
    declarations: [
        ProgressSpinnerComponent,
        FormControlPipe,
        LedgerBoxComponent,
        ItemBoxComponent,
        TaxGroupBoxComponent,
        ITreeTableComponent,
        IMatDatepickerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,        
        AngularMaterialModule,
        AngularTreeGridModule,
        AppOverlayModule        
    ],
    exports: [
        ProgressSpinnerComponent,
        FormControlPipe,
        LedgerBoxComponent,
        ItemBoxComponent,
        TaxGroupBoxComponent, 
        ITreeTableComponent,
        IMatDatepickerComponent
    ],
    providers: [
        LedgerServiceService,
        CustomDateAdapterService,
        DatePipe
    ]
})
export class SharedModule { }