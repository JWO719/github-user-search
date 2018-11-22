import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page: number;

  @Input() maxPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  public increasePage() {
    this.page++;
    this.pageChange.emit(this.page);
  }

  public decreasePage() {
    this.page--;
    this.pageChange.emit(this.page);
  }
}
