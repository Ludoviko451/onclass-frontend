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
import { HttpClientModule } from '@angular/common/http';
import { Inject } from '@angular/core';
import { mocks } from 'src/shared/mocks/mocks';

describe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;
  let technologySvc: TechnologyService;
  let capacitySvc: CapacityService;
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

    const techs: ITechnology[] = mocks.technologies;
    spyOn(technologySvc, 'getAllTechnologies').and.returnValue(of(techs));
    component.ngOnInit();
    expect(component.technologies).toEqual(techs);
    expect(component.formCreate.controls['technologiesForm'].value).toEqual(techs);
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

});
