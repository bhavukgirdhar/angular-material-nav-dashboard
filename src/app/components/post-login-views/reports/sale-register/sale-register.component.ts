import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PLedgerMaster } from 'src/server';

@Component({
  selector: 'app-sale-register',
  templateUrl: './sale-register.component.html',
  styleUrls: ['./sale-register.component.css']
})
export class SaleRegisterComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  public saleRegisterForm!: FormGroup;

  constructor(private breakpointObserver: BreakpointObserver,private customDateAdapterService  : CustomDateAdapterService, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    let txDate = new Date();

    this.saleRegisterForm = this.formBuilder.group({
      ledger : new FormControl(''),
      startDate: new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate())),
      endDate : new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate())),
      isItemDetailRequired : new FormControl(true)
    });
  }

  onFromLedgerSelection(selectedLedger: PLedgerMaster) : void {
    
  }

}
