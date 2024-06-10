import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITechnology } from 'src/shared/models/technology.interface';
import { ITechnologyRequest } from 'src/shared/models/technology.request';
import { Response } from 'src/shared/models/response';
import { SwitchService } from './switch.service';
import { DataService } from 'src/shared/models/data-service.interface';

@Injectable({ providedIn: 'root' })
export class TechnologyService implements DataService<ITechnology> {
  private readonly _endpoint = environment.apiTechnology;
  public size = 10;
  public page = 0;
  public order = 'asc';
  public postResponse!: Response;

  constructor(private _http: HttpClient, private switchSvc: SwitchService) {}

  public changeSize(size: number): void {
    this.size = size;
  }

  public changeOrder(): void {
    this.order = this.order === 'desc' ? 'asc' : 'desc';
  }

  public changePage(page: number): void {
    this.page = page;
  }

  public getData(): Observable<ITechnology[]> {
    return this._http.get<ITechnology[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&sortBy=${this.order}&field=name`);
  }

  public getAllTechnologies(): Observable<ITechnology[]> {
    return this._http.get<ITechnology[]>(`${this._endpoint}?page=0&size=999&sortBy=asc&field=name`);
  }

  public postTechnology(newTechnology: ITechnologyRequest): void {
    this._http.post<ITechnologyRequest>(this._endpoint, newTechnology)
      .subscribe({
        next: (createdTechnology: ITechnologyRequest) => {
          this.postResponse = {
            status: 201,
            message: '!Tecnología Creada!'
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
