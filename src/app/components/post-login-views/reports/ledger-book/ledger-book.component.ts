import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ledger-book',
  templateUrl: './ledger-book.component.html',
  styleUrls: ['./ledger-book.component.css']
})
export class LedgerBookComponent implements OnInit {

  options: string[] = ['One', 'Two', 'Three'];

  constructor() { }

  ngOnInit(): void {
  }

}