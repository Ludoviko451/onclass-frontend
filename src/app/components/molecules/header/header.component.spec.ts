import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/api/auth.service';
import { DOCUMENT } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let mockDocument: Document;

  beforeEach(async () => {
    // Crear un objeto simulado para AuthService
    const spy = jasmine.createSpyObj('AuthService', ['logout']);
    
    // Crear un objeto simulado para DOCUMENT
    mockDocument = document;

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: spy },
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle panel visibility', () => {
    expect(component.isVisible).toBeFalse();
    component.togglePanel();
    expect(component.isVisible).toBeTrue();
    component.togglePanel();
    expect(component.isVisible).toBeFalse();
  });

  it('should call logout on authSvc', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  })
  it('should hide panel when clicking outside', () => {
    const panel = document.createElement('app-admin-panel');
    const targetInside = document.createElement('div');
    const targetOutside = document.createElement('div');
    panel.appendChild(targetInside);
    document.body.appendChild(panel);
    document.body.appendChild(targetOutside);

    component.isVisible = true;

    spyOn(mockDocument, 'querySelector').and.returnValue(panel);

    fixture.detectChanges();

    // Simular el clic dentro del panel
    let eventInside = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    targetInside.dispatchEvent(eventInside);

    expect(component.isVisible).toBeTrue();

    // Simular el clic fuera del panel
    let eventOutside = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    targetOutside.dispatchEvent(eventOutside);

    expect(component.isVisible).toBeFalse();

    document.body.removeChild(panel);
    document.body.removeChild(targetOutside);
  });
});
