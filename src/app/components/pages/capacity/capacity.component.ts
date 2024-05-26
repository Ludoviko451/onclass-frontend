import { Component, inject} from '@angular/core';
import { CapacityService } from 'src/app/api/capacity.service';

@Component({
    selector: 'app-capacity',
    templateUrl: './capacity.component.html',
    styleUrls: ['./capacity.component.css'],
})
  export class CapacityComponent {

    capacityService = inject(CapacityService)

}
