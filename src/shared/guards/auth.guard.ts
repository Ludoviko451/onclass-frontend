// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // Si el usuario está autenticado, verifica el rol esperado si está presente
      
      const expectedRole = route.data['expectedRole'];
      if (expectedRole && !this.authService.hasRole(expectedRole)) {
        // Si el rol esperado no coincide, redirige al usuario a la página de inicio
        this.router.navigate(['/home']);
        return false;
      }
      // Si el usuario tiene el rol esperado o no se requiere un rol, permite el acceso
      return true;
    }

    // Si el usuario no está autenticado, redirige a la página de inicio de sesión con returnUrl
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
