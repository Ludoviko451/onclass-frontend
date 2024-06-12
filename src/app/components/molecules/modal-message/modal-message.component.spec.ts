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

  it('should call closeModal when close button is clicked', () => {
    switchServiceSpy.$modalMessage.emit({ isVisible: true });
    component.isVisible = true; 
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
    
    switchServiceSpy.$modalMessage.emit({ isVisible: true });
    expect(component.isVisible).toBeTrue();

    switchServiceSpy.$modalMessage.emit({ isVisible: false });
    expect(component.isVisible).toBeFalse();
  });
});
