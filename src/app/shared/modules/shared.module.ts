import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';
import { LedgerBoxComponent } from '../components/ledger-box/ledger-box.component';
import { LedgerServiceService } from 'src/server/api/ledgerService.service';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
    declarations: [
        ProgressSpinnerComponent,
        LedgerBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        MatProgressSpinnerModule
    ],
    exports: [
        ProgressSpinnerComponent,
        LedgerBoxComponent
    ],
    providers: [
        LedgerServiceService
    ]
})
export class SharedModule { }