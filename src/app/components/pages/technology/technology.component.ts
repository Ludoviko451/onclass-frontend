import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, Subscription, catchError } from 'rxjs';
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
  public showMessage = false;
  public modalSwitch = false;
  public text = '';
  public size = 10;
  public currentPage = 0;
  public asc = 'Asc 🡩';
  public desc = 'Desc 🡫';
  public order = this.desc;
  public options = [
    { value: '10', label: '10 - por página' },
    { value: '20', label: '20 - por página' },
    { value: '50', label: '50 - por página' }
  ];
  public postResponse: Response = {} as Response;
  public errorMessage: Response = {} as Response;
  
  private subscriptions = new Subscription();

  constructor(private modalSS: SwitchService, private technologySvc: TechnologyService) {}

  ngOnInit(): void {
    this.loadTechnologyList();

    this.subscriptions.add(
      this.modalSS.$modal.subscribe((valor) => this.modalSwitch = valor)
    );
    
    this.subscriptions.add(
      this.modalSS.$postTechnology.subscribe((postResponse) => {
        console.log(postResponse);
        this.text = '';
        this.postResponse = {} as Response;
        this.postResponse = postResponse;
        this.text = postResponse.message;
        this.loadTechnologyList();
      })
    );
  }

  changeOrder() {
    if (this.order === this.desc) {
      this.order = this.asc;
    } else {
      this.order = this.desc;
    }
    this.technologySvc.changeOrder();
    this.loadTechnologyList();
  }

  getPaginationClass(page: number) {
    return this.currentPage === page ? 'pagination-button pagination-button__active' : 'pagination-button';
  }

  onSizeChanged(size: number) { 
    this.size = size;
    this.technologySvc.changeSize(size);
    this.loadTechnologyList();
  }

  onPageChanged(pageNumber: number): void {
    if (this.errorMessage.status === 0 || this.errorMessage.status === 404) {
      this.currentPage--;
    } else {
      this.currentPage = pageNumber;
    }
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
  }

  openModal(): void {
    this.modalSwitch = true;
  }

  ngOnDestroy(): void {
    // Cancelar todas las suscripciones para evitar fugas de memoria
    this.subscriptions.unsubscribe();
  }
}
