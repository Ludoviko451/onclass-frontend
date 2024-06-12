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
  
      
      const expectedRole = route.data['expectedRole'];
      if (expectedRole && !this.authService.hasRole(expectedRole)) {
 
        this.router.navigate(['/home']);
        return false;
      }
 
      return true;
    }

  
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
