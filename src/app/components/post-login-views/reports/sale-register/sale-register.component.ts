import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomDateAdapterService } from 'src/app/services/date-adaptor';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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

  public startDate!: FormControl;
  public endDate!: FormControl;
  public itemdetailrequired!: boolean;
  constructor(private breakpointObserver: BreakpointObserver,private customDateAdapterService  : CustomDateAdapterService) {
    let txDate = new Date();

    this.startDate = new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate()));
    this.endDate = new FormControl(this.customDateAdapterService.createDate(txDate.getFullYear(),txDate.getMonth(), txDate.getDate()));

   }

  ngOnInit(): void {
  }

}
