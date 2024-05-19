import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { SwitchService } from './switch.service';
import { Response } from 'src/shared/models/response';
import { environment } from 'src/environments/environment';
import { ITechnology } from 'src/shared/models/technology.interface';
import { ITechnologyRequest } from 'src/shared/models/technology.request';

@Injectable({ providedIn: 'root' })
export class TechnologyService {
  private readonly _http = inject(HttpClient);
  private readonly _endpoint = environment.apiTechnology;
  private size = 10;
  public page = 0;
  public order = 'desc';

  public postResponse: Response = {} as Response;

  constructor(private switchSvc: SwitchService) { }

  public changeSize(size: number) {
    this.size = size;
  }

  public changeOrder() {
    this.order = this.order === 'desc' ? 'asc' : 'desc';
  }

  public changePage(page: number) {
    this.page = page;
  }

  public getTechnologies(): Observable<ITechnology[]> {
    return this._http.get<ITechnology[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=${this.order}&field=name`)
  }

  public postTechnology(newTechnology: ITechnologyRequest): void {
    this._http.post<ITechnologyRequest>(this._endpoint, newTechnology)
      .subscribe({
        next: (createdTechnology: ITechnologyRequest) => {
          this.postResponse = {
            status: 201,
            message: '¡Tecnologia Creada!'
          };
          console.log(this.postResponse)
          this.switchSvc.$postTechnology.next(this.postResponse);
        },
        error: (error) => {
          this.postResponse = {
            status: error.status,
            message: error.message
          };
          this.switchSvc.$postTechnology.next(this.postResponse);
        }
      });
  }
}
