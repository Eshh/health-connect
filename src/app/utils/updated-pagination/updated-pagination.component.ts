import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-updated-pagination',
  templateUrl: './updated-pagination.component.html',
  styleUrls: ['./updated-pagination.component.css']
})
export class UpdatedPaginationComponent{

  @Input() showBoundaryLinks = true;
  @Input() showDirectionLinks = true;
  @Input() maxSize = 5;
  @Input() rotate = true;


  @Input() totalItems = 0;
  @Input() page = 0;
  @Input() pageSize = 5;
  @Input() tableSizes = [5, 10, 20, 50, 100];
  @Input() defaultTableSize=5;

  @Output() sendDatatoParent = new EventEmitter<any>();




  constructor() { }

 
  //Pagination block code

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.defaultTableSize=this.pageSize;
    this.sendDatatoParent.emit({ page: this.page, pageSize: this.pageSize })
  }//end of onTableSizeChange function

  pageChanged(event: PageChangedEvent): void {
    this.page = (event.page - 1);
    this.pageSize = event.itemsPerPage;
    this.sendDatatoParent.emit({ page: this.page, pageSize: this.pageSize })
  }//end of pageChanged function

  changePagination(event: any) {
    this.pagination(event.size, event.page);
    this.sendDatatoParent.emit({ page: this.page, pageSize: this.pageSize })

  }//end of changePagination function

  pagination(size: any, page: any) {
    this.pageSize = +size;
    this.page = +page;
    this.sendDatatoParent.emit({ page: this.page, pageSize: this.pageSize })
  }//end of pagination function

}
