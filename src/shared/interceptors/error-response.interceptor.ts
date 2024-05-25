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

                    if (error.status === 0) {
                        errorMessage.message = `Estado del Servidor: Desconectado (Código de Error: 0)`;
                    }
                    else if(error.status === 400) {
                        errorMessage.message = `Bad Request`
                    }
                    else if (error.error && error.error.message) {
                        errorMessage.message = `Error: ${error.error.message}`;
                    } else {
                        errorMessage.message = `Error inesperado: ${error.message}`;
                    }
                }

                return throwError(() => errorMessage);
            })
        );
    }
}
