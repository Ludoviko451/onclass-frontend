import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseInterceptor } from './error-response.interceptor';
import { Response } from '../models/response';

describe('ErrorResponseInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle client-side error', () => {
    const mockErrorEvent = new ErrorEvent('Network error', {
      message: 'Client-side error'
    });

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a client-side error'),
      error: (error: Response) => {
        expect(error.status).toBe(0);
        expect(error.message).toBe('Error: Client-side error');
      }
    });

    const req = httpMock.expectOne('/test');
    req.error(mockErrorEvent);
  });

  it('should handle server-side error with status 400', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 400 error'),
      error: (error: Response) => {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Bad Request');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush({ message: 'Bad Request' }, mockErrorResponse);
  });

  it('should handle server-side error with custom message', () => {
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    const errorMessage = 'Custom error message';

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error: Response) => {
        expect(error.status).toBe(500);
        expect(error.message).toBe(`Error: ${errorMessage}`);
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush({ message: errorMessage }, mockErrorResponse);
  });

  it('should handle unexpected server-side error', () => {
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error: Response) => {
        expect(error.status).toBe(500);
        expect(error.message).toBe('Error inesperado: Http failure response for /test: 500 Internal Server Error');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, mockErrorResponse);
  });

  it('should handle server disconnect error', () => {
    const mockErrorResponse = { status: 0, statusText: 'Unknown Error' };

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 0 error'),
      error: (error: Response) => {
        expect(error.status).toBe(0);
        expect(error.message).toBe('Estado del Servidor: Desconectado (Código de Error: 0)');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, mockErrorResponse);
  });
});
