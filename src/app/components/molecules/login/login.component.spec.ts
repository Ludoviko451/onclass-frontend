import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/api/auth.service';
import { SwitchService } from 'src/app/api/switch.service';
import { EventEmitter } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let switchSvc: SwitchService;

  beforeEach(async () => {
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule],
      providers: [FormBuilder, { provide: AuthService, useValue: authServiceSpyObj }]
    })
      .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    switchSvc = TestBed.inject(SwitchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on AuthService when form is valid', () => {
  
    const email = 'test@example.com';
    const password = 'password123';
    const loginDto = { email, password };

    const loginSpy = authServiceSpy.login.and.returnValue(of(null));

    component.formLogin.setValue({ email, password });
    component.login();

 
    expect(loginSpy).toHaveBeenCalledWith(loginDto);
  });

  it('should reset form after successful login', () => {

    const loginSpy = authServiceSpy.login.and.returnValue(of(null));

    component.login();


    expect(component.formLogin.value).toEqual({ email: '', password: '' });
  });

  it('should close modal', () => {
    component.closeForm();
    const spySwitch = spyOn(switchSvc, '$modal').and.returnValue(new EventEmitter<boolean>(true));
  })
});

