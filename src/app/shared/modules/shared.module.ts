import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';
import { LedgerBoxComponent } from '../components/ledger-box/ledger-box.component';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { AngularMaterialModule } from './angular-material.module';
import { ITreeTableComponent } from '../components/i-tree-table/i-tree-table.component';
import { AngularTreeGridModule } from 'angular-tree-grid';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { IMatDatepickerComponent } from '../components/i-mat-datepicker/i-mat-datepicker.component';



@NgModule({
    declarations: [
        ProgressSpinnerComponent,
        LedgerBoxComponent,
        ITreeTableComponent,
        IMatDatepickerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,        
        AngularMaterialModule,
        AngularTreeGridModule        
    ],
    exports: [
        ProgressSpinnerComponent,
        LedgerBoxComponent,
        ITreeTableComponent,
        IMatDatepickerComponent
    ],
    providers: [
        LedgerServiceService,
        CustomDateAdapterService
    ]
})
export class SharedModule { }