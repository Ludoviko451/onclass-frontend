
import { Component} from '@angular/core';
import { TechnologyService } from 'src/app/api/technology.service';


@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent{
  
  constructor(public technologyService: TechnologyService) {}

}
