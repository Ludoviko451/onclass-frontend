import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICapacity } from 'src/shared/models/capacity.interface';
import { ICapacityRequest } from 'src/shared/models/capacity.request';
import { SwitchService } from './switch.service';
import { Response } from 'src/shared/models/response';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/shared/models/data-service.interface';

@Injectable({ providedIn: 'root' })
export class CapacityService implements DataService<ICapacity> {

  public capacities: ICapacity[] = [];
  private readonly _endpoint = environment.apiCapacity;
  page = 0;
  size = 10;
  order = "asc";
  public postResponse:Response = {status: 0, message: ""};
  
  constructor(private _http: HttpClient, private switchSvc: SwitchService) {
    this.getData();
  }

  public changeOrder() {
    this.order = this.order === "desc" ? "asc" : "desc";
  }

  public changePage(page: number) {
    this.page = page;
  }

  public changeSize(size: number) {
    this.size = size;
  }

  public getData() {
    return this._http.get<ICapacity[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=${this.order}&technologies=true&field=name`);
  }

  public getAllCapacity() {
    return this._http.get<ICapacity[]>(`${this._endpoint}?page=${this.page}&size=999&sortBy=${this.order}&technologies=true&field=name`);
  }

  public postCapacity(newCapacity: ICapacityRequest): void {
    this._http.post<ICapacityRequest>(this._endpoint, newCapacity)
      .subscribe({
        next: (createdCapacity: ICapacityRequest) => {
          this.postResponse = {
            status: 201,
            message: '¡Capacidad Creada!'
          };
          this.switchSvc.$postData.next(this.postResponse);
        },
        error: (error) => {
          this.postResponse = {
            status: error.status,
            message: error.message
          };
          this.switchSvc.$postData.next(this.postResponse);
        }
      });
  }
}
