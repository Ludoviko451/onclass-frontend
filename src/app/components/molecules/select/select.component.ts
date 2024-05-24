import { ITechnology } from 'src/shared/models/technology.interface';
import { Observable} from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TechnologyService } from 'src/app/api/technology.service';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css']
})
export class SelectComponent  implements OnInit{

  dataContainer = "data-container--disabled"
  @Input() type: string = ""

  @Output() technologyListChanged = new EventEmitter<ITechnology[]>()
  technologys: ITechnology[] = []
  technologySvc = inject(TechnologyService);

  public technologyList$!: Observable<ITechnology[]>;
  ngOnInit(): void {
      this.technologySvc.changeSize(100);
      this.technologyList$ = this.technologySvc.getAllTechnologies();
  }

  deleteItem(technology: ITechnology) {
    const index = this.technologys.indexOf(technology);
    if (index > -1) {
      this.technologys.splice(index, 1);
      this.technologyListChanged.emit(this.technologys);
    }
  }

  addElement(tech: ITechnology) {

    if(this.technologys.includes(tech)) {
      console.log("No se pueden agregar tecnologias repetidas")
    } else {
      this.technologys.push(tech)
      this.technologyListChanged.emit(this.technologys)
    }
    console.log(this.technologys)
  }
  openSelect() {
    if(this.dataContainer == "data--disabled") {
      this.dataContainer = "data"
    } else {
      this.dataContainer = "data--disabled"
    }
  }
}
