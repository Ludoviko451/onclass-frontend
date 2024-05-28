import { Component, Input } from '@angular/core';
import { RouteImages } from 'src/app/util/route.images';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() isBootcamp = false;
    route = RouteImages
    @Input() title:string = '';
    @Input() description: string = '';

    changeImage() {

        if (this.isBootcamp) {
            return this.route.VERSION
        }
        return this.route.BUTTON
    }
}
