import { Component, OnInit, inject } from '@angular/core';
import { BootcampService } from 'src/app/api/bootcamp.service';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.css']
})
export class BootcampComponent {

  
  bootcampService = inject(BootcampService);
}
