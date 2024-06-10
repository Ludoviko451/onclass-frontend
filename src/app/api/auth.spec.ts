import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { LoginDto } from 'src/shared/models/login.dto';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SwitchService } from './switch.service';
import { Response } from 'src/shared/models/response';

// Dummy component for testing routes
@Component({ template: '' })
class DummyComponent {}

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;
  let switchService: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: DummyComponent },
          { path: 'home', component: DummyComponent }
        ])
      ],
      declarations: [DummyComponent],
      providers: [
        AuthService,
        SwitchService
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    switchService = TestBed.inject(SwitchService);

    spyOn(router, 'navigate').and.stub();
    spyOn(switchService.$modalMessage, 'emit');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully and update currentUser', () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'test123' };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwibmFtZSI6IlVzZXJUZXN0IiwiZXhwIjoxOTM2MTk5MzUxfQ.somerandomstring';
    const roles = ['admin'];

    authService.login(loginDto).subscribe(
      () => {
        expect(authService.currentUserValue.token).toEqual(token);
        expect(authService.currentUserValue.roles).toEqual(roles);
        expect(localStorage.getItem('currentUser')).toBeTruthy();
      },
      (error) => fail(error)
    );

    const loginReq = httpMock.expectOne('http://localhost:8090/auth/login');
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(token);

    const roleReq = httpMock.expectOne(`http://localhost:8090/user/roleByEmail?email=${loginDto.email}`);
    expect(roleReq.request.method).toBe('GET');
    roleReq.flush(roles.join(',')); // Simulate server returning roles as comma-separated string

    httpMock.verify();
  });

  it('should logout and clear currentUser', (done) => {
    const dummyToken = 'dummyToken';
    const currentUser = { token: dummyToken, roles: ['admin'] };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('token', dummyToken);
    authService.currentUserValue = currentUser;

    expect(authService.currentUserValue).toEqual(currentUser);

    authService.logout();

    setTimeout(() => {
      expect(authService.currentUserValue).toBeNull();
      expect(localStorage.getItem('currentUser')).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    }, 0);
  });

  it('should handle login error correctly', () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'test123' };
    const errorMessage = 'Http failure response for http://localhost:8090/auth/login: 401 Unauthorized';
    const errorResponse = { status: 401, statusText: 'Unauthorized', message: errorMessage };

    authService.login(loginDto).subscribe(
      () => fail('Expected error to be thrown'),
      (error: Response) => {
        expect(error.message).toEqual(errorMessage);
        expect(error.status).toEqual(401);
        expect(switchService.$modalMessage.emit).toHaveBeenCalledWith(true);
      }
    );

    const loginReq = httpMock.expectOne('http://localhost:8090/auth/login');
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(errorMessage, errorResponse);
  });

  it('should get current user value as observable', (done) => {
    const currentUser = { token: 'dummyToken', roles: ['admin'] };
    authService.currentUserValue = currentUser;

    authService.currentUser.subscribe((user) => {
      expect(user).toEqual(currentUser);
      done();
    });
  });
});
