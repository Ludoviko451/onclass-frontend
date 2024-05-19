import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;
  displayedPages: number[] = [1, 2, 3];
  totalPages: number = 10;

  constructor() { }

  ngOnInit(): void {
    this.updateDisplayedPages();
  }

  goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage - 1);
      this.updateDisplayedPages();
    }
  }

  goToPrev(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
      this.updateDisplayedPages();
    }
  }

  updateDisplayedPages(): void {
    const firstPage = this.calculateFirstPage();
    this.displayedPages = [firstPage, firstPage + 1, firstPage + 2];
  }

  calculateFirstPage(): number {
    let firstPage = this.currentPage;
    if (firstPage + 2 > this.totalPages) {
      firstPage = this.totalPages - 2;
    }
    if (firstPage < 1) {
      firstPage = 1;
    }
    return firstPage;
  }


  onPageClick(pageNumber: number): void {
    console.log(`Clicked Page: ${pageNumber}`);
    // Aquí puedes implementar más lógica según la página clickeada, como cargar datos específicos, etc.
  }

  getPaginationClass(page: number): string {
    return this.currentPage === page ? 'pagination-button pagination-button__active' : 'pagination-button';
  }
}