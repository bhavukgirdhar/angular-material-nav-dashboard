import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { getData } from './data';

@Component({  
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DayBookComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  columnDefs = [
    {headerName  : 'Make' , field : 'make'},
    {headerName  : 'Model' , field : 'model'},
    {headerName  : 'Price' , field : 'price'}
  ];

  public rowData: any[] | null = getData();

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }
 

}