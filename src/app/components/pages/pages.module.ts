import { NgModule } from "@angular/core";
import { CapacityComponent } from "./capacity/capacity.component";
import { TechnologyComponent } from "./technology/technology.component";
import { LibraryComponent } from "./library/library.component";
import { HomeComponent } from "./home/home.component";
import { CommonModule } from "@angular/common";
import { AtomsModule } from "../atoms/atoms.module";
import { MoleculesModule } from "../molecules/molecules.module";
import { RouterModule } from "@angular/router";
import { TechnologyService } from "src/app/api/technology.service";
import { SwitchService } from "src/app/api/switch.service";
import { HttpClient } from "@angular/common/http";



@NgModule({
    declarations: [
        CapacityComponent,
        TechnologyComponent,
        LibraryComponent,
        HomeComponent
    ],

    imports: [
        RouterModule,
        CommonModule,
        AtomsModule,
        MoleculesModule
    ],

    providers: [
        TechnologyService,
        SwitchService,
        HttpClient
    ],

    exports: [
        HomeComponent,
        LibraryComponent,
        TechnologyComponent
    ]
})

export class PagesModule {}