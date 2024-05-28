import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalFormComponent } from './modal-form.component';
import { TechnologyService } from 'src/app/api/technology.service';
import { CapacityService } from 'src/app/api/capacity.service';
import { By } from '@angular/platform-browser';
import { MoleculesModule } from '../molecules.module';
import { HttpClientModule } from '@angular/common/http';
import { mocks } from 'src/shared/mocks/mocks';
import { BootcampService } from 'src/app/api/bootcamp.service';
import { constants } from 'src/app/util/constants';

describe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;
  let technologySvc: TechnologyService;
  let capacitySvc: CapacityService;
  let bootcampSvc: BootcampService;
  beforeEach(async () => {


    await TestBed.configureTestingModule({
      declarations: [ModalFormComponent],
      imports: [ReactiveFormsModule, MoleculesModule, HttpClientModule],
      providers: [
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormComponent);
    technologySvc = TestBed.inject(TechnologyService);
    capacitySvc = TestBed.inject(CapacityService);
    bootcampSvc = TestBed.inject(BootcampService);
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

  it('should submit a technology', () => {
    component.type = "Tecnologia"
    component.newTechnology.name = "Tecnologia1"
    component.newTechnology.description = "blabla"

    spyOn(technologySvc, 'postTechnology')
    component.onSubmit()
    expect(technologySvc.postTechnology).toHaveBeenCalled()
  })

  it('should submit a capacity', () => {
    component.type = "Capacidad"
    component.newCapacity.name = "Capacidad1"
    component.newCapacity.description = "blabla"
    component.newCapacity.technologyList = mocks.technologies;

    spyOn(capacitySvc, 'postCapacity')
    component.onSubmit()
    expect(capacitySvc.postCapacity).toHaveBeenCalled()
  })

  it('should submit a bootcamp', () => {
    component.type = "Bootcamp"
    component.newBootcamp.name = "Bootcamp1"
    component.newBootcamp.description = "blabla"
    component.newBootcamp.capacityList = mocks.capacities;

    spyOn(bootcampSvc, 'postBootcamp')
    component.onSubmit()
    expect(bootcampSvc.postBootcamp).toHaveBeenCalled()
  })

  it('should set validators for bootcamp', () => {
    component.type = "Bootcamp"
    component.setValidators();
    expect(component.validators.maxLenght).toBe(constants.capacityValidators.max);
    expect(component.validators.minLenght).toBe(constants.capacityValidators.min);
    expect(component.validators.maxlengthMessage).toBe(constants.capacityMaxLenght);
    expect(component.validators.minlengthMessage).toBe(constants.capacityMinLenght);
  })

  it('should set validators for capacity', () => {
    component.type = "Capacidad"
    component.setValidators();
    expect(component.validators.maxLenght).toBe(constants.technologyValidators.max);
    expect(component.validators.minLenght).toBe(constants.technologyValidators.min);
    expect(component.validators.maxlengthMessage).toBe(constants.technologyMaxLenght);
    expect(component.validators.minlengthMessage).toBe(constants.technologyMinLenght);
  })  
});
