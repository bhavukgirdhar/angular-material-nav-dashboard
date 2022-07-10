import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-overstock-report',
  templateUrl: './overstock-report.component.html',
  styleUrls: ['./overstock-report.component.css']
})
export class OverstockReportComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver) { 
    
  }

  ngOnInit(): void {
  }

}
