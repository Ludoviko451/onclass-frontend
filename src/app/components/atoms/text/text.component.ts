import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  @Input() iconClass: string = '';
  @Input() text: string = '';
  @Input() textClass:string = 'text'
  @Input() className:string = 'text_container'
  @Input() alt:string = ''
  @Input() hasImage:boolean = false
}
