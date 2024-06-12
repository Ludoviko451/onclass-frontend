import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PaginationService } from 'src/app/api/pagination.service';
import { SwitchService } from 'src/app/api/switch.service';
import { constants } from 'src/app/util/constants';
import { RouteImages } from 'src/app/util/route.images';
import { DataService } from 'src/shared/models/data-service.interface';
import { Response } from 'src/shared/models/response';

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
  constructor(private switchSvc: SwitchService, private paginationSvc: PaginationService) {
    
  }
  public dataList$!: Observable<T[]>;
  public currentPage = 0;
  public text = '';
  public modalSwitch = false;
  private componentDestroy$ = new Subject<void>();
  public errorMessage: Response = { status: 0, message: '' };
  public postResponse: Response = { status: 0, message: '' };
  public route = RouteImages;

  ngOnInit(): void {
    this.switchSvc.$modal.pipe(takeUntil(this.componentDestroy$)).subscribe((valor) => this.modalSwitch = valor);

    this.switchSvc.$postData.pipe(takeUntil(this.componentDestroy$)).subscribe((postResponse) => {
      this.postResponse = postResponse;
      this.text = postResponse.message;

      this.switchSvc.$modalMessage.emit({ isVisible: true});
  
      this.loadDataList();
    });

    this.loadDataList();
  }

  changeOrder(): void {
    this.dataService.changeOrder();
    this.loadDataList();
  }

  onSizeChanged(size: number): void {
    this.dataService.changeSize(size);
    this.onPageChanged(0);
    this.paginationSvc.$sizeChange.emit(size);
    this.loadDataList();
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.dataService.changePage(this.currentPage);
    this.loadDataList();
  }

  loadDataList(): void {
    this.errorMessage = { status: 0, message: '' };
    this.dataList$ = this.dataService.getData().pipe(
      catchError(error => {
        this.errorMessage.status = error.status;
        this.errorMessage.message = error.message;
        if (error.message === constants.dataNotFound) {
          this.errorMessage.message = this.noDataMesage();
        }

        return EMPTY;
      })
    );
  }

  openModal(): void {
    this.modalSwitch = true;
  }

  noDataMesage(): string {
    switch (this.type) {
      case 'Bootcamp':
        return "Crea un Bootcamp";
      case 'Capacidad':
        return "Crea una capacidad";
      case 'Tecnología':
        return "Crea una tecnología";
      default:
        return "Tipo no valido";
    }
  }

  ngOnDestroy(): void {
    this.componentDestroy$.unsubscribe();
  }
}
