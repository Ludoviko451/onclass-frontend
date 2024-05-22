// generic-list.component.ts
import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PaginationService } from 'src/app/api/pagination.service';
import { SwitchService } from 'src/app/api/switch.service';
import { DataService } from 'src/shared/models/data-service.interface';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
export class GenericListComponent<T> implements OnInit, OnDestroy {
  @Input() dataService!: DataService<T>;
  @Input() itemTemplate!: any;
  @Input() type = '';
  @Output() create = new EventEmitter<void>();

  public switchSvc = inject(SwitchService)
  public paginationSvc = inject(PaginationService)
  public dataList$!: Observable<T[]>;
  public currentPage = 0;
  public text = '';
  public modalSwitch = false;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.switchSvc.$modal.pipe(takeUntil(this.unsubscribe$)).subscribe((valor) => this.modalSwitch = valor);
    this.loadDataList();
  }

  changeOrder(): void {
    this.dataService.changeOrder();
    this.loadDataList();
  }

  onSizeChanged(size: number): void {
    this.dataService.changeSize(size);
    this.onPageChanged(0);
    this.paginationSvc.$sizeChange.emit(size)
    this.loadDataList();
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.dataService.changePage(this.currentPage);
    this.loadDataList();
  }

  private loadDataList(): void {
    this.dataList$ = this.dataService.getData().pipe(
      catchError(error => {
        return EMPTY;
      })
    );
  }

  openModal(): void {
    this.modalSwitch = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
