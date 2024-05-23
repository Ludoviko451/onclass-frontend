import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
    selector: 'app-input',
    
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
      }
    ]
  })
  export class InputComponent implements ControlValueAccessor {
    @Input() name: string = '';
    @Input() invalid: boolean = false;
    @Input() placeholder: string = '';
    @Input() text: string = '';
  
    value: string = '';
  
    onChange = (value: any) => {};
    onTouched = () => {};
  
    writeValue(value: any): void {
      this.value = value;
    }
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    onInput(event: Event): void {
      const value = (event.target as HTMLInputElement).value;
      this.value = value;
      this.onChange(value);
    }
  }