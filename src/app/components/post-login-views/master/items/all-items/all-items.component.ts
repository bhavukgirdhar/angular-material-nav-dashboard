import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OverlayService } from 'src/app/services/overlay.service';
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
  selectedRowIndex = -1;

  @ViewChild('filterInput') 
  filterInput: ElementRef;

  constructor(private router: Router, private itemServiceApi : ItemServiceService, private overlayService : OverlayService) {    
  }

  ngOnInit(): void {
    this.getItemsByCriteria.startPageIndex = 0;
    this.getItemsByCriteria.genericSearch = false; 

    this.overlayService.enableProgressSpinner();

    this.getAllItems();
  }

  private getAllItems() {
    this.itemServiceApi.getPItemMasterList(this.getItemsByCriteria).subscribe({
      next: (data) => {
        this.dataSource.data = data.objects || [];
        this.filterInput.nativeElement.focus();

        this.overlayService.disableProgressSpinner();
      },
      error: () => { this.overlayService.disableProgressSpinner(); }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewItem() : void {
    this.router.navigate(['main/master/newItem']);
  }

  public editItem() : void {
    this.router.navigate(['main/master/editItem', this.selectedRowIndex]);
  }

  public deleteSelectedItem() : void {
    if (window.confirm('Are you sure want to delete this item ?')) {
        this.itemServiceApi._delete(this.selectedRowIndex).subscribe({
          next: () => {
            this.getAllItems();
          },
          error: () => {}
        });
    }
  }

  highlight(row : PItemMaster){
    this.selectedRowIndex = row.id || -1;
  }



}
