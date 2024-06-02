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
        this.checkScreenWidth();
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
            return this.authSvc.currentUserValue.roles.includes("ADMIN")
        }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.checkScreenWidth();
    }

    checkScreenWidth() {
        this.isMobile = window.innerWidth <= 768;
        // Si es móvil y el menú está oculto, asegurar que el botón de menú sea visible
        if (this.isMobile && !this.showMenu) {
            this.showMenu = false; // Forzar el menú a estar oculto en pantallas móviles
        }
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    onNavigate(route: string) {
        this.router.navigateByUrl(route);
        if (this.isMobile) {
            this.showMenu = false; // Ocultar automáticamente el menú después de la navegación en pantallas móviles
        }
    }
}