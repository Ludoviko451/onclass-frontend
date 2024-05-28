import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/shared/models/response';
import { SwitchService } from './switch.service';
import { IVersion } from 'src/shared/models/version.interface';
import { IVersionRequest } from 'src/shared/models/version.request';

@Injectable({providedIn: 'root'})
export class VersionService {
    constructor() { }
    

    public versions = []
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiVersion;
    page = 0;
    size = 10;
    order = "asc";
    public postResponse: Response = {} as Response;

    switchSvc = inject(SwitchService);

    public changePage(page: number) {
        this.page = page
    }

    public changeSize(size: number) {
        this.size = size
    }

    public getVersion(bootcampId: number) {
        return this._http.get<IVersion[]>(`${this._endpoint}?page=${this.page}&size=${this.size}&field=id&sortBy=${this.order}&bootcampIds=${bootcampId}`)
    }

    public postVersion(newVersion: IVersionRequest): void {
        this._http.post<IVersionRequest>(this._endpoint, newVersion)
            .subscribe({
                next: (createdVersion: IVersionRequest) => {
                    this.switchSvc.$postData.next(createdVersion)
                    this.postResponse.status = 201
                    this.postResponse.message = "!Version Creada!"
                    this.switchSvc.$postData.next(this.postResponse)
                },
                error: (error) => {
                    this.postResponse = error;
                    this.switchSvc.$postData.next(this.postResponse)
                }
            })
    }
}