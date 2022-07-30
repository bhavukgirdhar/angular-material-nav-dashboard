import { Component, OnInit } from '@angular/core';
import { PLedgerMaster } from 'src/server';


@Component({
  selector: 'app-ledger-book',
  templateUrl: './ledger-book.component.html',
  styleUrls: ['./ledger-book.component.css']
})
export class LedgerBookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
  }

  onLedgerSelection(selectedLedger : PLedgerMaster) {
    console.log(selectedLedger);
  }

}
