import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { SwitchService } from './switch.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginDto } from 'src/shared/models/login.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let switchService: SwitchService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, SwitchService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    switchService = TestBed.inject(SwitchService);
    router = TestBed.inject(Router);

    spyOn(router, 'navigate').and.stub(); // Mock navigation if necessary

    // Remove any previous spies on emit
    if ((switchService.$isLoggedIn.emit as any).calls) {
      (switchService.$isLoggedIn.emit as any).calls.reset();
    } else {
      spyOn(switchService.$isLoggedIn, 'emit').and.callThrough();
    }
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully and update currentUser', () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'test123' };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwicm9sZXMiOlsiQURNSU4iXX0.somerandomstring';
    const decodedToken = { sub: 'test@example.com', authorities: ['ADMIN'] };

    spyOn<any>(authService, 'decodeToken').and.returnValue(decodedToken);
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(authService, 'logout').and.callThrough();

    authService.login(loginDto).subscribe(
      (currentUser) => {
        expect(currentUser.token).toEqual(token);
        expect(currentUser.roles).toEqual(decodedToken.authorities); // Check the roles are correctly assigned
        expect(localStorage.setItem).toHaveBeenCalledWith('token', token); // Check token set
        expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(currentUser)); // Check currentUser set
        expect(switchService.$isLoggedIn.emit).toHaveBeenCalledWith(true); // Check emit called with true
      },
      (error) => fail(error)
    );

    const loginReq = httpMock.expectOne('http://localhost:8090/auth/login');
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(token);
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


  it('should get current user value as observable', (done) => {
    const currentUser = { token: 'dummyToken', roles: ['admin'] };
    authService.currentUserValue = currentUser;

    authService.currentUser.subscribe((user) => {
      expect(user).toEqual(currentUser);
      done();
    });
  });
});
