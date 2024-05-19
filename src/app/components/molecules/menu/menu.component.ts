import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

    info = [
        {
            name: "Tecnologías",
            url: "/library/technology"
        },
        {
            name: "Capacidades",
            url: "/library/capacity"
        },
        {
            name: "Bootcamps",
            url: "/library/bootcamp"
        }
    ]
}
