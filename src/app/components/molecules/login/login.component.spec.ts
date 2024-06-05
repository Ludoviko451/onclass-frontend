import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MoleculesModule } from '../molecules.module';
import { HttpClientModule } from '@angular/common/http';
import { mocks } from 'src/shared/mocks/mocks';
import { AuthService } from 'src/app/api/auth.service';
import { SwitchService } from 'src/app/api/switch.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSvc: AuthService;
  let switchSvc: SwitchService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MoleculesModule, HttpClientModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authSvc = TestBed.inject(AuthService);
    switchSvc = TestBed.inject(SwitchService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    const form = fixture.nativeElement.querySelector('.form');
    expect(form).toBeTruthy();
  });

  it('should login', () => { 
    const user = mocks.userLogin;
    
    component.formLogin.get('email')?.setValue(user.email);
    component.formLogin.get('password')?.setValue(user.password);
    component.login();

    spyOn(authSvc, 'login').and.callThrough();

    expect(component.error).toEqual('');
  })

  it('should handle postData subscription on ngOnInit', () => {
    // Arrange
    const errorMessage = 'Test error message';
    
  
    component.ngOnInit();
    switchSvc.$postData .next({message: errorMessage});
    fixture.detectChanges(); // Trigger change detection


    expect(component.error).toBe(errorMessage);
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
