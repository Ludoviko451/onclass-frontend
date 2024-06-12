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

  constructor(private technologySvc: TechnologyService, private capacitySvc: CapacityService){}
  dataContainer = "data--disabled"
  @Input() type: string = ""
  @Output() dataListChanged = new EventEmitter<ITechnology[]>()
  data: any[] = []
  typeData =''
  public technologyList$!: Observable<ITechnology[]>;
  public capacityList$! : Observable<ICapacity[]>;

  ngOnInit(): void {
      if(this.type === "Bootcamp"){
        this.typeData = "Capacidad"
      } else if (this.type === "Capacidad"){
        this.typeData = "Tecnología"
      }
      this.capacityList$ = this.capacitySvc.getAllCapacity();
      this.technologyList$ = this.technologySvc.getAllTechnologies();
  }

  deleteItem(data: ITechnology | ICapacity) {
    const index = this.data.indexOf(data);
    if (index > -1) {
      this.data.splice(index, 1);
      this.dataListChanged.emit(this.data);
    }
  }

  dataList(){
    if(this.type === "Bootcamp"){
      return this.capacityList$
    }
    if(this.type === "Capacidad"){
      return this.technologyList$
    } 
    return null;
  }

  addElement(item: ITechnology | ICapacity) {
    if(!this.data.includes(item)) {
      this.data.push(item)
      this.dataListChanged.emit(this.data)
    }
  }
  openSelect() {
    if(this.dataContainer == "data--disabled") {
      this.dataContainer = "data"
    } else {
      this.dataContainer = "data--disabled"
    }
  }

  handleButtonClick(event: Event) {
    event.stopPropagation();
    this.openSelect();
}
}
