import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SwitchService } from './api/switch.service';
import { AuthService } from './api/auth.service';
import { EventEmitter} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let switchService: SwitchService;
  let authService: AuthService;
  let currentUserSubject: BehaviorSubject<any>;

  beforeEach(async () => {
    const switchServiceMock = {
      $isLoggedIn: new EventEmitter<boolean>()
    };

    currentUserSubject = new BehaviorSubject<any>(null);

    const authServiceMock = {
      currentUser: currentUserSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AppComponent],
      providers: [
        { provide: SwitchService, useValue: switchServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    switchService = TestBed.inject(SwitchService);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true if currentUser exists', () => {
    spyOn(switchService.$isLoggedIn, 'emit');

    currentUserSubject.next({ roles: ['STUDENT'] });
    component.ngOnInit();
    fixture.detectChanges();

    expect(switchService.$isLoggedIn.emit).toHaveBeenCalledWith(true);
    expect(component.isStudent).toBeTrue();
  });

  it('should set isLoggedIn to false if currentUser does not exist', () => {
    spyOn(switchService.$isLoggedIn, 'emit');

    currentUserSubject.next(null);
    component.ngOnInit();
    fixture.detectChanges();

    expect(switchService.$isLoggedIn.emit).toHaveBeenCalledWith(false);
    expect(component.isStudent).toBeFalse();
  });

  it('should update isLoggedIn when $isLoggedIn event is emitted', () => {
    fixture.detectChanges();

    switchService.$isLoggedIn.emit(true);
    expect(component.isLoggedIn).toBeTrue();

    switchService.$isLoggedIn.emit(false);
    expect(component.isLoggedIn).toBeFalse();
  });
});
