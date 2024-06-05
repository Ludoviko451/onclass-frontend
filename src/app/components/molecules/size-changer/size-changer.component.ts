import { Component, EventEmitter, Output } from '@angular/core';
import { RouteImages } from 'src/app/util/route.images';
@Component({
  selector: 'app-size-changer',
  templateUrl: './size-changer.component.html',
  styleUrls: ['./size-changer.component.css']
})
export class SizeChangerComponent {

  @Output() sizeChanged: EventEmitter<number> = new EventEmitter<number>();

  actualSize = 10

  route = RouteImages;

  optionsSwitch = "options-container--disabled";
  
  options = [
    { value: 10, label: '10 por página' },
    { value: 20, label: '20 por página' },
    { value: 50, label: '50 por página' }
  ];

  openOptions(){
    if(this.optionsSwitch == "options-container--disabled"){
      this.optionsSwitch = "options-container"
    }else{
      this.optionsSwitch = "options-container--disabled"
    }
  }

  changeSize(size:number){
    this.actualSize = size
    this.optionsSwitch = "options-container--disabled"
    this.sizeChanged.emit(this.actualSize)
  }
}
