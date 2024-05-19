import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: 'app-input',
    
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
})
export class InputContainerComponent {

  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() text: string = '';

  @Output() valueChanged = new EventEmitter<string>();

  onInputChange(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(value)
  }

}
