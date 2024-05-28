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




  it('should handle unexpected server-side error', () => {
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error: Response) => {
        expect(error.status).toBe(500);
        expect(error.message).toBe('Error del servidor');
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
