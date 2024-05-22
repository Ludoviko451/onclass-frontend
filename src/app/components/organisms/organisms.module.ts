import { NgModule } from '@angular/core';
import { GenericListComponent } from './generic-list/generic-list.component';
import { TechnologyService } from 'src/app/api/technology.service';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationService } from 'src/app/api/pagination.service';
import { SwitchService } from 'src/app/api/switch.service';


@NgModule({
    imports: [AtomsModule, MoleculesModule, CommonModule, RouterModule],

    declarations: [GenericListComponent],
    providers: [TechnologyService, PaginationService, SwitchService],
    exports: [GenericListComponent]
})
export class OrganismsModule { }
