import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorResponseInterceptor } from './error-response.interceptor';
import { Response } from '../../models/response';
import { SwitchService } from 'src/app/api/switch.service';

describe('ErrorResponseInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let switchService: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SwitchService,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    switchService = TestBed.inject(SwitchService);
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

  it('should handle 401 unauthorized error', () => {
    const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 401 error'),
      error: (error: Response) => {
        expect(error.status).toBe(401);
        expect(error.message).toBe('NO AUTORIZADO');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, mockErrorResponse);
  });

  it('should handle parsing error when error is not a valid JSON string', () => {
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 400 error'),
      error: (error: Response) => {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Some error message');
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush('Some error message', mockErrorResponse);
  });

  it('should handle server-side error with specific message', () => {
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    const errorMessage = { message: 'Error del servidor' };

    httpClient.get('/test').subscribe({
      next: () => fail('should have failed with a 500 error'),
      error: (error: Response) => {
        expect(error.status).toBe(500);
        expect(error.message).toBe(errorMessage.message);
      }
    });

    const req = httpMock.expectOne('/test');
    req.flush(errorMessage, mockErrorResponse);
  });
});
