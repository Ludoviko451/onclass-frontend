import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { contants } from 'src/app/util/constants';
@Component({
  selector: 'app-sortby',
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.css']
})
export class SortbyComponent implements OnInit {

  @Output () orderChange = new EventEmitter<string>();
  constructor() { }
  public isFading = false;
  ngOnInit(): void {
  }
 
  public asc = contants.asc;
  public desc = contants.desc;
  public order = this.asc;

  changeOrder() {
    this.isFading = true;
    setTimeout(() => {
      this.order = (this.order === this.desc) ? this.asc : this.desc;
      this.orderChange.emit(this.order);
      this.isFading = false;
    }, 300); // El tiempo debe coincidir con la duración de la transición en el CSS
  }
}
