import { PaginationService } from './../../../api/pagination.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { ITechnology } from 'src/shared/models/technology.interface';
import { Response } from 'src/shared/models/response';
import { SwitchService } from '../../../api/switch.service';
import { TechnologyService } from 'src/app/api/technology.service';


@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit, OnDestroy {
  public technologyList$!: Observable<ITechnology[]>;
  public paginationSvc = inject(PaginationService)
  public showMessage = false;
  public modalSwitch = false;
  public text = '';
  public size = 10;
  public currentPage = 0;
  public asc = 'Asc 🡩';
  public desc = 'Desc 🡫';
  public order = this.desc;
  public postResponse: Response = {} as Response;
  public errorMessage: Response = {} as Response;
  
  private unsubscribe$ = new Subject<void>();

  constructor(private modalSS: SwitchService, private technologySvc: TechnologyService) {}

  ngOnInit(): void {
    this.loadTechnologyList();

    this.modalSS.$modal.pipe(takeUntil(this.unsubscribe$)).subscribe((valor) => this.modalSwitch = valor);
    
    this.modalSS.$postTechnology.pipe(takeUntil(this.unsubscribe$)).subscribe((postResponse) => {
      this.text = '';
      this.postResponse = {} as Response;
      this.postResponse = postResponse;
      this.text = postResponse.message;
      this.loadTechnologyList();
    });
  }

  changeOrder() {
    this.order = (this.order === this.desc) ? this.asc : this.desc;
    this.technologySvc.changeOrder();
    this.loadTechnologyList();
  }

  getPaginationClass(page: number) {
    return this.currentPage === page ? 'pagination-button pagination-button__active' : 'pagination-button';
  }

  onSizeChanged(size: number) { 
    this.size = size;
    this.technologySvc.changeSize(size);
    this.paginationSvc.$sizeChange.emit(size);  
    this.onPageChanged(0);
    this.loadTechnologyList();
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.technologySvc.changePage(this.currentPage);
    this.loadTechnologyList();
  }

  private loadTechnologyList(): void {
    this.technologyList$ = this.technologySvc.getTechnologies().pipe(
      catchError((error) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
    this.errorMessage = {} as Response;
  }

  openModal(): void {
    this.modalSwitch = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
