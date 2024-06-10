import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/api/auth.service';
import { constants } from 'src/app/util/constants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['hasRole']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isVisible to true if user has ADMIN role', () => {
    authServiceSpy.hasRole.and.callFake((role: string) => role === 'ADMIN');
    component.verifyRole();
    expect(component.isVisible).toBeTrue();
  });

  it('should set isVisible to false if user does not have ADMIN role', () => {
    authServiceSpy.hasRole.and.callFake((role: string) => role !== 'ADMIN');
    component.verifyRole();
    expect(component.isVisible).toBeFalse();
  });

  it('should set message to studentHome if user has STUDENT role', () => {
    authServiceSpy.hasRole.and.callFake((role: string) => role === 'STUDENT');
    component.typeMessage();
    expect(component.message).toBe(constants.studentHome);
  });

  it('should set message to teacherHome if user has TEACHER role', () => {
    authServiceSpy.hasRole.and.callFake((role: string) => role === 'TEACHER');
    component.typeMessage();
    expect(component.message).toBe(constants.teacherHome);
  });

  it('should not set message if user has neither STUDENT nor TEACHER role', () => {
    authServiceSpy.hasRole.and.returnValue(false);
    component.typeMessage();
    expect(component.message).toBe('');
  });
});
