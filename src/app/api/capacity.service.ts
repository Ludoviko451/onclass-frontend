import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { ITechnology } from 'src/shared/models/technology.interface';
import { ICapacity } from 'src/shared/models/capacity.interface';
import { ICapacityRequest } from 'src/shared/models/capacity.request';
import { SwitchService } from './switch.service';
import { Response } from 'src/shared/models/response';
import { environment } from 'src/environments/environment';
@Injectable({providedIn: 'root'})
export class CapacityService {

    public capacities = [];
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiCapacity;
    page = 0;

    size = 10;

    order = "asc";

    public changeOrder() {

        if(this.order === "desc") {
            this.order = "asc";
          }
        else {
            this.order = "desc";
        }
    }

    public changePage(page: number) {
        this.page = page
    }

    public changeSize(size: number){
        this.size = size
    }

    public postResponse:Response = {} as Response;

    
    switchSvc = inject(SwitchService);
    
    constructor() {
        this.getCapacities();
    }
    public getCapacities() {
        return this._http.get<ICapacity[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=${this.order}&technologies=true&field=name`)
    }

    public postCapacity(newCapacity: ICapacityRequest): void {
        this._http.post<ICapacityRequest>(this._endpoint, newCapacity)
          .subscribe({
            next: (createdCapacity: ICapacityRequest) => {
              this.switchSvc.$postCapacity.next(createdCapacity)
              this.postResponse.status = 201
              this.postResponse.message = "¡Capacidad Creada!"
              this.switchSvc.$postCapacity.next(this.postResponse)
            },
            error: (error) => {
              console.log(error)
              this.postResponse = error
              this.switchSvc.$postCapacity.next(this.postResponse)
            }
          });
      }
}