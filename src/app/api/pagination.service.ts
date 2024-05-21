import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PaginationService{

    $sizeChange = new EventEmitter<any>();
    constructor() { }
    
}