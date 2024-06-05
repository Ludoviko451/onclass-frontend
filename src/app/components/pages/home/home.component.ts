import { Component, OnInit, inject } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { BootcampService } from 'src/app/api/bootcamp.service';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent{

}
