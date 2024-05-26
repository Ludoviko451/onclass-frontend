import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CapacityService } from 'src/app/api/capacity.service';
import { PaginationService } from 'src/app/api/pagination.service';
import { TechnologyService } from 'src/app/api/technology.service';
import { RouteImages } from 'src/app/util/route.images';
import { ICapacity } from 'src/shared/models/capacity.interface';
import { ITechnology } from 'src/shared/models/technology.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() type: string = '';
  routes = RouteImages;
  technologyList$!: Observable<ITechnology[]>;
  capacityList$!: Observable<ICapacity[]>
  currentPage: number = 0;
  displayedPages: number[] = [];
  totalPages: number = 1;
  pageSize: number = 10;
  technologySvc = inject(TechnologyService);
  capacitySvc = inject(CapacityService);
  paginationSvc = inject(PaginationService);
  dataList = []


  ngOnInit(): void {
    this.paginationSvc.$sizeChange.subscribe((size) => {
      this.pageSize = size;
      if(this.type === 'Tecnologia') {
        this.loadTechnologyList();
      }
      if(this.type === 'Capacidad') {
        this.loadCapacityList();
      }
      this.currentPage = 0;
    });
    if(this.type === 'Tecnologia') {
      this.loadTechnologyList();
    }
    if(this.type === 'Capacidad') {
      this.loadCapacityList();
    }
  }

  loadCapacityList(): void {
    this.capacityList$ = this.capacitySvc.getAllCapacity();

    this.capacityList$.subscribe(capacities => {
      this.totalPages = Math.ceil(capacities.length / this.pageSize);
      this.updateDisplayedPages();
    });

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
