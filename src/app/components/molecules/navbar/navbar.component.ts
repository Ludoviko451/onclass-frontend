import { Component, HostListener } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { RouteImages } from 'src/app/util/route.images';
@Component({
    selector: 'app-navbar',
    
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    route = RouteImages;
    isMobile: boolean = false;
    showMenu: boolean = false;

    constructor(private router: Router, private authSvc: AuthService) {

    }

    routes = [
        {
            name: "Inicio",
            url : "/home",
            icon: this.route.HOME,
            alt: "Icono de inicio",
            isHidden: false
        },
        {
            name: "Biblioteca",
            url : "/library",
            icon: this.route.LIBRARY,
            alt: "Icono de la biblioteca",
            isHidden: this.verifyRole()
        }
    ]


    verifyRole(){
        if(this.authSvc.currentUserValue){
            return !this.authSvc.currentUserValue.roles.includes("ADMIN")
        } else {
            return true;
        }
    }

    
}