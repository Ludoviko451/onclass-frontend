import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalMessageComponent } from './modal-message.component';
import { SwitchService } from 'src/app/api/switch.service';
import { RouteImages } from 'src/app/util/route.images';
import { EventEmitter } from '@angular/core';
import { MoleculesModule } from '../molecules.module';

describe('ModalMessageComponent', () => {
  let component: ModalMessageComponent;
  let fixture: ComponentFixture<ModalMessageComponent>;
  let switchServiceSpy: jasmine.SpyObj<SwitchService>;

  beforeEach(async () => {
    const switchSpy = jasmine.createSpyObj('SwitchService', ['emit', 'next', '$modalMessage']);
    switchSpy.$modalMessage = new EventEmitter<boolean>();

    await TestBed.configureTestingModule({
      imports: [
        MoleculesModule
      ],
      declarations: [ModalMessageComponent],
      providers: [
        { provide: SwitchService, useValue: switchSpy }
      ]
    })
    .compileComponents();

    switchServiceSpy = TestBed.inject(SwitchService) as jasmine.SpyObj<SwitchService>;

    fixture = TestBed.createComponent(ModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display success icon and text when isSuccessful is true', () => {
    switchServiceSpy.$modalMessage.emit(true);
    component.isSuccessful = true;
    component.text = 'Operation was successful';
    component.alt = 'SUCCESS ICON';
    fixture.detectChanges();

    const imgElement = fixture.nativeElement.querySelector('img');

    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain(RouteImages.SUCCESS.split('/').pop()); // Verifica solo el nombre del archivo
    expect(imgElement.alt).toBe('SUCCESS ICON');
  });

  it('should display error icon and text when isSuccessful is false', () => {
    switchServiceSpy.$modalMessage.emit(true);
    component.isSuccessful = false;
    component.text = 'Operation was failed';
    component.alt = 'ERROR ICON';
    fixture.detectChanges();

    const imgElement = fixture.nativeElement.querySelector('img');

    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain(RouteImages.ERROR.split('/').pop()); // Verifica solo el nombre del archivo
    expect(imgElement.alt).toBe('ERROR ICON');
  });

  it('should call closeModal when close button is clicked', () => {
    switchServiceSpy.$modalMessage.emit(true);
    component.isVisible = true; // Asegúrate de que el modal esté visible
    fixture.detectChanges();

    spyOn(component, 'closeModal');
    const button = fixture.debugElement.query(By.css('.modal__close-button')).nativeElement;
    button.click();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should set isVisible to false when closeModal is called', () => {
    component.closeModal();
    expect(component.isVisible).toBeFalse();
  });

  it('should subscribe to modalSS.$modalMessage on init', () => {
    spyOn(switchServiceSpy.$modalMessage, 'subscribe').and.callThrough();
    component.ngOnInit();
    expect(switchServiceSpy.$modalMessage.subscribe).toHaveBeenCalled();
  });

  it('should update isVisible when $modalMessage emits a value', () => {
    component.ngOnInit();
    
    switchServiceSpy.$modalMessage.emit(true);
    expect(component.isVisible).toBeTrue();

    switchServiceSpy.$modalMessage.emit(false);
    expect(component.isVisible).toBeFalse();
  });
});
