import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PLedgerMaster } from 'src/server';

@Component({
  selector: 'app-purchase-register',
  templateUrl: './purchase-register.component.html',
  styleUrls: ['./purchase-register.component.css']
})
export class PurchaseRegisterComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

public purchaseRegisterForm! : FormGroup;
  constructor(private breakpointObserver: BreakpointObserver,private customDateAdapterService  : CustomDateAdapterService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    let txDate = new Date();

    this.purchaseRegisterForm = this.formBuilder.group({
      ledgerId : new FormControl(''),
      ledgerName : new FormControl(''),
      startDate: new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate())),
      endDate : new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate())),
      ShowItemDetail: new FormControl(true)
  });
}
getReport() : void{
  console.log(this.purchaseRegisterForm.controls["ledgerName"].value);
  console.log(this.purchaseRegisterForm.controls["startDate"].value);
  console.log(this.purchaseRegisterForm.controls["endDate"].value);
  console.log(this.purchaseRegisterForm.controls["isItemDetailRequired"].value);
}
onFromLedgerSelection(selectedLedger: PLedgerMaster) : void {
    
}
}
