import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page: number = 0;

  @Output() newPage = new EventEmitter();
  // Previous page
  btnPrevPage() {
    if (this.page > 1) {
      this.newPage.emit(this.page - 1);
    }
  }
  
  // Next page
  btnNextPage() {
    this.newPage.emit(this.page + 1);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
