import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AngularTreeGridComponent } from 'angular-tree-grid';

import { getData } from './data';

@Component({  
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.css'],
})
export class DayBookComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  @ViewChild('angularGrid') angularGrid: AngularTreeGridComponent;

  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    parent_display_field: 'id', 
    pagination: true,   
    css:{
      table_class: 'full-width-table',
      header_class: 'angular-tree-grid-header'
    },
    columns: [
      {
        name: 'name',
        header: 'Name',
        css_class: 'text-left'
      },
      {
        name: 'age',
        header: 'Age',
        renderer: function(value: string) {
          return value + ' years';
        }
      }
    ]
  };

  //Parent data will have  parent = 0
  data= [
    { id: 1, name: 'Ashok', age: 60, parent: 0},
    { id: 2, name: 'Sam', age: 40, parent: 1},
    { id: 3, name: 'Sriya', age: 36, parent: 1},
    { id: 4, name: 'Prakash', age: 20, parent: 2},
    { id: 5, name: 'Sneha', age: 21, parent: 3},
    { id: 6, name: 'Pritam', age: 60, parent: 34},
    { id: 7, name: 'Roshan', age: 40, parent: 6},
    { id: 8, name: 'Suraj', age: 36, parent: 6},
    { id: 9, name: 'Swarup', age: 20, parent: 8},
    { id: 10, name: 'Aditya', age: 21, parent: 8},
    { id: 34, name: 'Bhavuk', age: 21, parent: 0},
  ];
  
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }
 
  expandAll() {
    this.angularGrid.expandAll();
  }
  collapseAll() {
    this.angularGrid.collapseAll();
  }

  rowSelected(event: any) : void{
    console.log(event);
  }
}