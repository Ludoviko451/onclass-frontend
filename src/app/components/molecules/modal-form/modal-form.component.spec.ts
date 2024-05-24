import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ModalFormComponent } from './modal-form.component';
import { SwitchService } from 'src/app/api/switch.service';
import { TechnologyService } from 'src/app/api/technology.service';
import { CapacityService } from 'src/app/api/capacity.service';
import { ITechnology } from 'src/shared/models/technology.interface';
import { By } from '@angular/platform-browser';
import { MoleculesModule } from '../molecules.module';

describe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;
  let switchServiceSpy: jasmine.SpyObj<SwitchService>;
  let technologyServiceSpy: jasmine.SpyObj<TechnologyService>;
  let capacityServiceSpy: jasmine.SpyObj<CapacityService>;

  beforeEach(async () => {
    const switchSpy = jasmine.createSpyObj('SwitchService', ['emit', 'next']);
    const techSpy = jasmine.createSpyObj('TechnologyService', ['getAllTechnologies', 'postTechnology']);
    const capacitySpy = jasmine.createSpyObj('CapacityService', ['']);

    await TestBed.configureTestingModule({
      declarations: [ModalFormComponent],
      imports: [ReactiveFormsModule, MoleculesModule],
      providers: [
        { provide: SwitchService, useValue: switchSpy },
        { provide: TechnologyService, useValue: techSpy },
        { provide: CapacityService, useValue: capacitySpy }
      ]
    })
    .compileComponents();

    switchServiceSpy = TestBed.inject(SwitchService) as jasmine.SpyObj<SwitchService>;
    technologyServiceSpy = TestBed.inject(TechnologyService) as jasmine.SpyObj<TechnologyService>;
    capacityServiceSpy = TestBed.inject(CapacityService) as jasmine.SpyObj<CapacityService>;

    technologyServiceSpy.getAllTechnologies.and.returnValue(of([]));

    fixture = TestBed.createComponent(ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form invalid when empty', () => {
    expect(component.formCreate.valid).toBeFalsy();
  });

  it('should check name validity', () => {
    let name = component.formCreate.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();

    name.setValue('A very long name that exceeds the maximum length allowed by the validators set in the form.');
    expect(name.hasError('maxlength')).toBeTruthy();
  });

  it('should check description validity', () => {
    let description = component.formCreate.controls['description'];
    expect(description.valid).toBeFalsy();

    description.setValue('');
    expect(description.hasError('required')).toBeTruthy();

    description.setValue('A very long description that exceeds the maximum length allowed by the validators set in the form.');
    expect(description.hasError('maxlength')).toBeTruthy();
  });

  it('should call closeModal on close button click', () => {
    spyOn(component, 'closeModal');
    let button = fixture.debugElement.query(By.css('.modal__close-button')).nativeElement;
    button.click();
    expect(component.closeModal).toHaveBeenCalled();
  });


  it('should initialize technologies on ngOnInit', () => {
    const techs: ITechnology[] = [{id: 1, name: 'Tech1', description:"blabla" }, {id: 2, name: 'Tech2', description:"blabla" }];
    technologyServiceSpy.getAllTechnologies.and.returnValue(of(techs));
    component.ngOnInit();
    expect(component.technologies).toEqual(techs);
    expect(component.formCreate.controls['technologiesForm'].value).toEqual(techs);
  });
  
});
