import { Component} from '@angular/core';
import { BootcampService } from 'src/app/api/bootcamp.service';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';
@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.css']
})
export class BootcampComponent{
  
  constructor(public bootcampSvc: BootcampService){}
  sendBootcamp(bootcamp: IBootcamp) {
    localStorage.setItem('bootcamp', JSON.stringify(bootcamp));
  }

}
