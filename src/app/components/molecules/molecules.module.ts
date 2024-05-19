import { CapacityService } from 'src/app/api/capacity.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { AtomsModule } from '../atoms/atoms.module';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SelectComponent } from './select/select.component';
import { SizeChangerComponent } from './size-changer/size-changer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TechnologyService } from 'src/app/api/technology.service';
import { SwitchService } from 'src/app/api/switch.service';
import { InputContainerComponent } from './input-container/input.component';



@NgModule({
  declarations: [
    CardComponent,
    MenuComponent,
    MenuItemComponent,
    ModalFormComponent,
    ModalMessageComponent,
    NavbarComponent,
    PaginationComponent,
    SelectComponent,
    SizeChangerComponent,
    InputContainerComponent

  ],
  imports: [
    CommonModule,
    AtomsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    TechnologyService,
    CapacityService,
    SwitchService
  ],
  
  exports: [
    
    CardComponent,
    MenuComponent,
    MenuItemComponent,
    ModalFormComponent,
    ModalMessageComponent,
    NavbarComponent,
    PaginationComponent,
    SelectComponent,
    SizeChangerComponent,
    InputContainerComponent
  ]
})
export class MoleculesModule { }
