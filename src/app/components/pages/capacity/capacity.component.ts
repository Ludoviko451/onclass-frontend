import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICapacity } from 'src/shared/models/capacity.interface';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { CapacityService } from 'src/app/api/capacity.service';
import { Response } from 'src/shared/models/response';
import { SwitchService } from '../../../api/switch.service';
@Component({
    selector: 'app-capacity',
    templateUrl: './capacity.component.html',
    styleUrls: ['./capacity.component.css'],
})
  export class CapacityComponent implements OnInit, OnDestroy {

  constructor(private capacitySvc: CapacityService, private modalSS: SwitchService) {}
  public capacityList$!: Observable<ICapacity[]>;
  


  public modalSwitch:boolean = false;

  
  public text:string = ""

  public size: number = 10

  public currentPage = 0;


  public asc: string = "Asc 🡩"
  
  public desc: string = "Desc 🡫"

  public order: string = this.desc;

  public numberOfPages = new Array(3);

  
  options = [
      { value: '10', label: '10 - por página' },
      { value: '20', label: '20 - por página' },
      { value: '50', label: '50 - por página' }
    ];

    postResponse:Response = {} as Response;


    errorMessage:Response = {} as Response;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.loadCapacityList();
    this.modalSS.$modal.subscribe((valor) => this.modalSwitch = valor);

    this.modalSS.$postCapacity.subscribe((postResponse) => {
      this.text = '';
      this.postResponse = {} as Response;
      
      this.postResponse = postResponse;
      this.text = postResponse.message;
      this.loadCapacityList();
    });

  }

  changeOrder(){

    if(this.order === this.desc){
        this.order = this.asc;
    } else {
        this.order = this.desc;
    }
    this.capacitySvc.changeOrder();
    this.loadCapacityList();
}


onSizeChanged(size: number){ 
    this.size = size;
    this.capacitySvc.changeSize(size);
    this.loadCapacityList();
}

onPageChanged(pageNumber: number): void {

    console.log(pageNumber);
    console.log(this.currentPage)
    this.currentPage = pageNumber;
    this.capacitySvc.changePage(this.currentPage);
    this.loadCapacityList();

    console.log(this.capacityList$);



  }

  private loadCapacityList(): void {
    this.capacityList$ = this.capacitySvc.getCapacities().pipe(
      catchError((error) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }

  openModal(): void{
    this.modalSwitch = true;
}


ngOnDestroy(): void {
  // Cancelar la suscripción para evitar fugas de memoria
  this.modalSS.$modal.unsubscribe();
  this.modalSS.$postCapacity.unsubscribe();
}
}
