import { Response } from 'src/shared/models/response';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
  switchSvc = inject(SwitchService);
  response: Response = {} as Response;

  constructor(private http: HttpClient, private router: Router) {
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
    return this.http.post('http://localhost:8090/auth/login', userDto, { responseType: 'text' })
      .pipe(
        switchMap((token: string) => {
          localStorage.setItem('token', token);
          this.currentUserSubject.next({ token });

          const email = this.decodeToken(token).sub;
          return this.getRolesByEmail(email).pipe(
            map((roles: string[]) => {
              const currentUser = { token, roles };
              this.currentUserSubject.next(currentUser);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.switchSvc.$isLoggedIn.emit(true);
              return currentUser;
            })
          );
        }),
        catchError((error) => {
          this.switchSvc.$modalMessage.emit(true);
          this.response.message = error.message;
          this.response.status = error.status;
          return throwError(() => this.response);
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

  hasRole(role: string): boolean {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.roles && currentUser.roles.includes(role);
  }

  private getRolesByEmail(email: string): Observable<string[]> {
    return this.http.get(`http://localhost:8090/user/roleByEmail?email=${email}`, { responseType: 'text' }).pipe(
      map((response: string) => response.split(',')),
      catchError((error) => {
        console.error('Error fetching roles by email', error);
        return throwError(() => new Error(error));
      })
    );
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
