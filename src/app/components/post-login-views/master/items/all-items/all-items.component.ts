import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetObjectsArgument, PItemMaster } from 'src/server';
import { ItemServiceService } from 'src/server/api/itemService.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css']
})
export class AllItemsComponent implements OnInit, AfterViewInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['name',
    'productCode',
    'groupName',
    'unitName',
    'mrp',
    'sellingPrice',
    'taxClassName',
    'hsnCode'
  ];

  getItemsByCriteria : GetObjectsArgument = {}

  public dataSource = new MatTableDataSource<PItemMaster>([]);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  @ViewChild('filterInput') 
  filterInput: ElementRef;

  constructor( private itemServiceApi : ItemServiceService) {

  }

  ngOnInit(): void {
    this.getItemsByCriteria.startPageIndex = 0;
    this.getItemsByCriteria.genericSearch = false; 

    this.itemServiceApi.getPItemMasterList(this.getItemsByCriteria).subscribe({
      next: (data) => {          
        this.dataSource.data = data.objects || [];
        this.filterInput.nativeElement.focus();
      },
      error: () => { }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
