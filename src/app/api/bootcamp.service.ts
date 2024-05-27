import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';
import { DataService } from 'src/shared/models/data-service.interface';
import { IBootcampRequest } from 'src/shared/models/bootcamp.request';
import { Response } from 'src/shared/models/response';
import { SwitchService } from './switch.service';
@Injectable({providedIn: 'root'})
export class BootcampService implements DataService<IBootcamp> {

    public bootcamps = []
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiBootcamp;
    page = 0;
    size = 10;
    order = "asc";
    public postResponse: Response = {} as Response;
    switchSvc = inject(SwitchService)
    constructor() {
        this.getData();
    }

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

    public getData() {
        return this._http.get<IBootcamp[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=${this.order}&capacities=true&field=id`)
    }

    public postBootcamp(newBootcamp : IBootcampRequest): void {

        this._http.post<IBootcampRequest>(this._endpoint, newBootcamp)
        .subscribe({
            next: (createdBootcamp: IBootcampRequest) => {
                this.postResponse = {
                    status: 201,
                    message: '!Bootcamp Creado!'
                  };
                  console.log(this.postResponse);
                  this.switchSvc.$postData.next(this.postResponse);
            },
            error: (error) => {
                this.postResponse = {
                    status: error.status,
                    message: error.message
                  };
                  this.switchSvc.$postData.next(this.postResponse);
                }
        })
    }
}