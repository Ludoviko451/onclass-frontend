import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginDto } from 'src/shared/models/login.dto';
import { SwitchService } from './switch.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private switchSvc: SwitchService) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Emitir el estado de inicio de sesión al cargar la aplicación
    const isLoggedIn = !!storedUser;
    this.switchSvc.$isLoggedIn.emit(isLoggedIn);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }
    
  login(userDto: LoginDto): Observable<any> {
    this.logout();
    return this.http.post('http://localhost:8090/auth/login', userDto, { responseType: 'text' })
      .pipe(
        switchMap((token: string) => {
          localStorage.setItem('token', token);
          const decodedToken = this.decodeToken(token);
          const currentUser = { token, roles: decodedToken.authorities };
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
          this.switchSvc.$isLoggedIn.emit(true);
          return of(currentUser); // Convertir el objeto en un observable usando 'of'
        }),
        catchError((error) => {
          this.switchSvc.$modalMessage.emit(true);
          return throwError(error);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    this.switchSvc.$isLoggedIn.emit(false);
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  hasRole(role: string): boolean {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.roles && currentUser.roles.includes(role);
  }
}
