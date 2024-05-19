import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
  export class ButtonComponent {

    @Output() buttonClick = new EventEmitter();

    @Input() className: string = '';

    @Input() disabled: boolean = false;
    
    @Input() class = ''; 

    onClick(): void {
      this.buttonClick.emit();
    }
  }
