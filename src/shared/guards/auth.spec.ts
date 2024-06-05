import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/app/api/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['currentUserValue', 'hasRole']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if user is authenticated and has expected role', () => {
    authServiceMock.currentUserValue = { token: 'test-token', roles: ['ADMIN'] };
    authServiceMock.hasRole.and.returnValue(true);

    const routeMock: any = { data: { expectedRole: 'ADMIN' } };
    const stateMock: any = { url: '/admin' };

    expect(authGuard.canActivate(routeMock, stateMock)).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation if user is not authenticated', () => {
    authServiceMock.currentUserValue = null;

    const routeMock: any = {};
    const stateMock: any = { url: '/admin' };

    expect(authGuard.canActivate(routeMock, stateMock)).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/admin' } });
  });

  it('should deny activation if user does not have expected role', () => {
    authServiceMock.currentUserValue = { token: 'test-token', roles: ['USER'] };
    authServiceMock.hasRole.and.returnValue(false);

    const routeMock: any = { data: { expectedRole: 'ADMIN' } };
    const stateMock: any = { url: '/admin' };

    expect(authGuard.canActivate(routeMock, stateMock)).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should allow activation if user is authenticated and no expected role is specified', () => {
    authServiceMock.currentUserValue = { token: 'test-token', roles: ['USER'] };
    authServiceMock.hasRole.and.returnValue(true); // No se verifica rol específico

    const routeMock: any = { data: {} };
    const stateMock: any = { url: '/admin' };

    expect(authGuard.canActivate(routeMock, stateMock)).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
