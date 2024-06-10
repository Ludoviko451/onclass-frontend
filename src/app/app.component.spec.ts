import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SwitchService } from './api/switch.service';
import { EventEmitter } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let switchService: SwitchService;

  beforeEach(async () => {
    const switchServiceMock = {
      $isLoggedIn: new EventEmitter<boolean>()
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: SwitchService, useValue: switchServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    switchService = TestBed.inject(SwitchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true if currentUser is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ token: 'dummyToken' }));
    spyOn(switchService.$isLoggedIn, 'emit');

    component.ngOnInit();

    expect(switchService.$isLoggedIn.emit).toHaveBeenCalledWith(true);
  });

  it('should set isLoggedIn to false if currentUser is not in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(switchService.$isLoggedIn, 'emit');

    component.ngOnInit();

    expect(switchService.$isLoggedIn.emit).toHaveBeenCalledWith(false);
  });

  it('should update isLoggedIn when $isLoggedIn event is emitted', () => {
    fixture.detectChanges(); // Trigger initial data binding

    switchService.$isLoggedIn.emit(true);
    expect(component.isLoggedIn).toBeTrue();

    switchService.$isLoggedIn.emit(false);
    expect(component.isLoggedIn).toBeFalse();
  });
});
