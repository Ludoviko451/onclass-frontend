import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPanelComponent } from './admin-panel.component';
import { AuthService } from 'src/app/api/auth.service';
import { SwitchService } from 'src/app/api/switch.service';
import { BehaviorSubject, of } from 'rxjs';
import { Response } from 'src/shared/models/response';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let mockAuthService: any;
  let mockSwitchService: any;

  beforeEach(async () => {
    mockAuthService = {
      currentUserValue: {
        roles: ['ADMIN']
      },
      logout: jasmine.createSpy('logout')
    };

    mockSwitchService = {
      $modal: new BehaviorSubject<boolean>(false),
      $postData: new BehaviorSubject<Response>({ status: 200, message: 'Test message' })
    };

    await TestBed.configureTestingModule({
      declarations: [AdminPanelComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: SwitchService, useValue: mockSwitchService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    component.ngOnInit();
    expect(component.title).toBe('ADMINISTRADOR');
    expect(component.panel).toEqual(component.panelAdmin);
    expect(component.role).toBe('ADMIN');
  });

  it('should handle admin operation', () => {
    component.handleOperation('admin');
    expect(component.type).toBe('ADMIN');
    expect(component.showModal).toBeTrue();
  });

  it('should handle teacher operation', () => {
    component.handleOperation('teacher');
    expect(component.type).toBe('TUTOR');
    expect(component.showModal).toBeTrue();
  });

  it('should handle student operation', () => {
    component.handleOperation('student');
    expect(component.type).toBe('ESTUDIANTE');
    expect(component.showModal).toBeTrue();
  });

  it('should handle logout operation', () => {
    component.handleOperation('logout');
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should update showModal when switchSvc.$modal emits a value', () => {
    mockSwitchService.$modal.next(true);
    expect(component.showModal).toBeTrue();
  });

  it('should update postResponse when switchSvc.$postData emits a value', () => {
    const newResponse: Response = { status: 201, message: 'New message' };
    mockSwitchService.$postData.next(newResponse);
    expect(component.postResponse).toEqual(newResponse);
  });
});
