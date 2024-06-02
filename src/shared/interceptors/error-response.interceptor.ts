import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Response } from '../models/response';
import { SwitchService } from 'src/app/api/switch.service';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {

    switchSvc = inject(SwitchService);

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

                    // Attempt to parse the error message if it's a JSON string
                    if (typeof error.error === 'string') {
                        try {
                            const parsedError = JSON.parse(error.error);
                            if (parsedError.message) {
                                errorMessage.message = parsedError.message;
                            } else {
                                errorMessage.message = parsedError;
                            }
                        } catch (e) {
                            errorMessage.message = error.error;
                        }
                    } else {
                        errorMessage.message = error.error.message || error.error.text;
                    }

                    switch (error.status) {
                        case 401:
                            errorMessage.message = `NO AUTORIZADO`;
                            break;
                        case 500:
                            errorMessage.message = `Error del servidor`;
                            break;
                        case 0:
                            errorMessage.message = `Estado del Servidor: Desconectado (Código de Error: 0)`;
                            break;  
                        default:
                            break;
                    }
                }

                return throwError(() => errorMessage);
            })
        );
    }
}
