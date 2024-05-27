import { ICapacity } from 'src/shared/models/capacity.interface';
import { ITechnology } from 'src/shared/models/technology.interface';
import { Observable} from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TechnologyService } from 'src/app/api/technology.service';
import { CapacityService } from 'src/app/api/capacity.service';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css']
})
export class SelectComponent  implements OnInit{

  dataContainer = "data--disabled"
  @Input() type: string = ""

  @Output() dataListChanged = new EventEmitter<ITechnology[]>()
  technologys: ITechnology[] = []
  technologySvc = inject(TechnologyService);
  capacitySvc = inject(CapacityService)

  public technologyList$!: Observable<ITechnology[]>;
  public capacityList$! : Observable<ICapacity[]>;

  ngOnInit(): void {
      console.log(this.type)
      this.capacityList$ = this.capacitySvc.getAllCapacity();
      this.technologyList$ = this.technologySvc.getAllTechnologies();
  }

  deleteItem(data: ITechnology | ICapacity) {
    const index = this.technologys.indexOf(data);
    if (index > -1) {
      this.technologys.splice(index, 1);
      this.dataListChanged.emit(this.technologys);
    }
  }

  dataList(){
    console.log(this.type)
    if(this.type === "Bootcamp"){
      return this.capacityList$
    }
    if(this.type === "Capacidad"){
      return this.technologyList$
    } 
    return null;
  }

  addElement(tech: ITechnology | ICapacity) {
    if(this.technologys.includes(tech)) {
  
    } else {
      this.technologys.push(tech)
      this.dataListChanged.emit(this.technologys)
    }
  }
  openSelect() {
    if(this.dataContainer == "data--disabled") {
      this.dataContainer = "data"
    } else {
      this.dataContainer = "data--disabled"
    }
  }
}
