import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [    
    ButtonComponent,
    HeaderComponent,
    TextComponent
  ],
  imports: [
    CommonModule,
  ],

  exports: [
    ButtonComponent,
    HeaderComponent,
    TextComponent
  ]
})
export class AtomsModule { }
