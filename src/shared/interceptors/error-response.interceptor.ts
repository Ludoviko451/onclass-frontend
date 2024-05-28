import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from '../models/response';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage: Response = {
                    status: error.status,
                    message: ''
                };

                if (error.error instanceof ErrorEvent) {
                    // Client-side or network error
                    errorMessage.message = `Error: ${error.error.message}`;
                } else {
                    // Server-side error
                    console.error('Error del servidor:', error);
                    switch (error.status) {
                        case 500:
                            errorMessage.message = `Error del servidor`;
                            break;
                        case 0:
                            errorMessage.message = `Estado del Servidor: Desconectado (Código de Error: 0)`;
                            break;  
                        default:
                            errorMessage.message = `${error.error.message}`
                    }
                }
                return throwError(() => errorMessage);
            })
        );
    }
}
