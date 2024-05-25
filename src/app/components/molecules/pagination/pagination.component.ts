import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/api/pagination.service';
import { TechnologyService } from 'src/app/api/technology.service';
import { RouteImages } from 'src/app/util/route.images';
import { ITechnology } from 'src/shared/models/technology.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  routes = RouteImages;
  technologyList$!: Observable<ITechnology[]>;
  currentPage: number = 0;
  displayedPages: number[] = [];
  totalPages: number = 1;
  pageSize: number = 10;
  technologySvc = inject(TechnologyService);
  paginationSvc = inject(PaginationService);

  ngOnInit(): void {
    this.paginationSvc.$sizeChange.subscribe((size) => {
      this.pageSize = size;
      this.loadTechnologyList();
      this.currentPage = 0;
    });
    this.loadTechnologyList();
  }

  loadTechnologyList(): void {
    this.technologyList$ = this.technologySvc.getAllTechnologies();
    this.technologyList$.subscribe(technologies => {
      this.totalPages = Math.ceil(technologies.length / this.pageSize);
      this.updateDisplayedPages();
    });
  }

  goToNext(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
      this.updateDisplayedPages();
    }
  }

  goToPrev(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
      this.updateDisplayedPages();
    }
  }

  updateDisplayedPages(): void {
    const maxDisplayedPages = 3;
    const pagesBeforeCurrent = Math.floor(maxDisplayedPages / 2);
    const pagesAfterCurrent = maxDisplayedPages - pagesBeforeCurrent - 1;
    let startPage = Math.max(0, this.currentPage - pagesBeforeCurrent);
    let endPage = Math.min(this.totalPages - 1, this.currentPage + pagesAfterCurrent);

    const ellipsisStart = startPage > 0;
    const ellipsisEnd = endPage < this.totalPages - 1;

    if (ellipsisStart) {
      startPage = Math.max(0, endPage - maxDisplayedPages + 1);
    }

    if (ellipsisEnd) {
      endPage = Math.min(this.totalPages - 1, startPage + maxDisplayedPages - 1);
    }

    this.displayedPages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  onPageClick(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageChanged.emit(this.currentPage);
    this.updateDisplayedPages();
  }

  getPaginationClass(page: number): string {
    return this.currentPage === page ? 'pagination-button pagination-button__active' : 'pagination-button';
  }
}
