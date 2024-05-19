import { Component, Input } from '@angular/core';
import { RouteImages } from 'src/app/util/route.images';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {

    route = RouteImages
    @Input() title:string = '';

    @Input() description: string = '';
}
