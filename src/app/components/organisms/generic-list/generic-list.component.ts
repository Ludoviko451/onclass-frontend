// generic-list.component.ts
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

  public switchSvc = inject(SwitchService)
  public paginationSvc = inject(PaginationService)
  public dataList$!: Observable<T[]>;
  public currentPage = 0;
  public text = '';
  public modalSwitch = false;
  private unsubscribe$ = new Subject<void>();
  public errorMessage:Response = {} as Response;
  public postResponse:Response = {} as Response;
  public route = RouteImages;
  ngOnInit(): void {
    this.switchSvc.$modal.pipe(takeUntil(this.unsubscribe$)).subscribe((valor) => this.modalSwitch = valor);
    
    this.switchSvc.$postData.pipe(takeUntil(this.unsubscribe$)).subscribe((postResponse) => {
      this.postResponse = {} as Response;
      this.postResponse = postResponse;
      this.text = postResponse.message;
      this.loadDataList();
    })
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

   loadDataList(): void {
    this.errorMessage = {} as Response;
    this.dataList$ = this.dataService.getData().pipe(
      catchError(error => {
        this.errorMessage.status = error.status
        this.errorMessage.message = error.message;
        if (error.message === constants.dataNotFound){
          this.errorMessage.message = this.noDataMesage();  
        }
        return EMPTY;
      })
    );
  }

  openModal(): void {
    this.modalSwitch = true;
  }

  noDataMesage(){
    switch(this.type){
      case 'Bootcamp':
        return "Crea un Bootcamp"
      case 'Capacidad':
        return "Crea una capacidad";
      case 'Tecnologia':
        return "Crea una tecnologia";
      default:
        return "Tipo no valido"
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();

  }
}
