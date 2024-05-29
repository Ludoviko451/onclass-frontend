import { Component, OnInit, inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BootcampService } from 'src/app/api/bootcamp.service';
import { VersionService } from 'src/app/api/version.service';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';
import { IVersion } from 'src/shared/models/version.interface';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.css']
})
export class BootcampComponent{
  

  sendBootcamp(bootcamp: IBootcamp) {
    localStorage.setItem('bootcamp', JSON.stringify(bootcamp));
  }
  bootcampService = inject(BootcampService);

}
