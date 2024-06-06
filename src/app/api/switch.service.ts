import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SwitchService {
  $modal = new EventEmitter<any>();
  $modalMessage = new EventEmitter<any>();
  $postData = new EventEmitter<any>();
  $isLoggedIn = new EventEmitter<any>();
}
