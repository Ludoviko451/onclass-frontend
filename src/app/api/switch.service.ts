import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SwitchService {
  $modal = new EventEmitter<any>();
  $postCapacity = new EventEmitter<any>();
  $modalMessage = new EventEmitter<any>();
  $postTechnology = new EventEmitter<any>();
}
