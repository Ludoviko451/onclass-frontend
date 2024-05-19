import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ITechnology } from '../shared/models/technology.interface';
import { environment } from '../environments/environmen.development';
import { tap } from 'rxjs';
import { ICapacity } from '../shared/models/capacity.interface';

@Injectable({providedIn: 'root'})
export class BootcampService {

    public bootcamps = signal<ITechnology[]>([])
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiBootcamp;

    constructor() {
        this.getBootcamps();
    }
    public getBootcamps() {
        this._http.get<ICapacity[]>(`${this._endpoint}?page=0&size=10&sortBy=asc&capacities=true&field=id`)
        .pipe(tap((data:ICapacity[]) => this.bootcamps.set(data)))
        .subscribe();
    }

}