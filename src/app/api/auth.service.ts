import { Response } from 'src/shared/models/response';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Importa Router para manejar redirecciones
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
   constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
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
          // Almacena el token JWT en localStorage o donde lo necesites
          localStorage.setItem('token', token);
          // Actualiza el currentUserSubject con el token
          this.currentUserSubject.next({ token });

          // Obtener roles del usuario por email
          const email = this.decodeToken(token).sub; // Asume que el token JWT tiene un 'sub' con el email del usuario
          return this.getRolesByEmail(email).pipe(
            map((roles: string[]) => {
              // Actualiza el currentUserSubject con el token y roles
              const currentUser = { token, roles };
              this.currentUserSubject.next(currentUser);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              return currentUser;
            })
          );
        }),
        catchError((error) => {
          // Manejar el error aquí
          this.switchSvc.$modalMessage.emit(true);
          this.response.message = error.message;
          this.response.status = error.status;
          
          return throwError(() => this.response); 
        })
      );
  }
  get currentUser$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
  logout() {
    // Elimina el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  hasRole(role: string): boolean {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.roles && currentUser.roles.includes(role);
  }

  private getRolesByEmail(email: string): Observable<string[]> {
    return this.http.get(`http://localhost:8090/user/roleByEmail?email=${email}`, { responseType: 'text' }).pipe(
      map((response: string) => {

        return response.split(','); // Asume que los roles están separados por comas
      }),
      catchError((error) => {
        // Manejar el error aquí
        console.error('Error fetching roles by email', error);
        return throwError(() => new Error(error));
      })
    );
  }

  private decodeToken(token: string): any {
    // Decodificar el token JWT para obtener el payload (asume el uso de base64 en JSON Web Token)
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
