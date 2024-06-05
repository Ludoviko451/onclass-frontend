
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SwitchService } from 'src/app/api/switch.service';
import { UserService } from 'src/app/api/user.service';
import { EventEmitter } from '@angular/core';
import { UserFormComponent } from './user-form.component';
import { MoleculesModule } from '../molecules.module';
import { HttpClientModule } from '@angular/common/http';
import { UserDto } from 'src/shared/models/user.dto';
import { mocks } from 'src/shared/mocks/mocks';
import { By } from '@angular/platform-browser';
describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userSvc: UserService;
  let switchSvc: SwitchService;
  beforeEach(async () => {;
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [ReactiveFormsModule, MoleculesModule, HttpClientModule],
      providers: []
      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userSvc = TestBed.inject(UserService);
    switchSvc = TestBed.inject(SwitchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.formUser).toBeDefined();
    expect(component.formUser.value).toEqual({
      name: '',
      lastName: '',
      email: '',
      password: '',
      dni: '',
      phoneNumber: ''
    });
  });


  it('should check name validity', () => {
    let name = component.formUser.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();

    name.setValue('A very long name that exceeds the maximum length allowed by the validators set in the form.');
    expect(name.hasError('maxlength')).toBeTruthy();
  });


  it('should submit a user', () => {
      let user: UserDto = mocks.user;

      spyOn(userSvc, 'createUser');
      component.registerUser();
      expect(userSvc.createUser).toHaveBeenCalled();
  })

  it('should have form invalid when empty', () => {
    expect(component.formUser.valid).toBeFalsy();
  });

  it('should call closeModal on close button click', () => {
    spyOn(component, 'closeModal');
    let button = fixture.debugElement.query(By.css('.modal__close-button')).nativeElement;
    button.click();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should throw error when phone number is not valid', () => {
    let phoneNumber = component.formUser.controls['phoneNumber'];
    phoneNumber.setValue('123');
    expect(phoneNumber.hasError('pattern')).toBeTruthy();
  })

  it('should not throw error when phone number is valid', () => {
    let phoneNumber = component.formUser.controls['phoneNumber'];
    phoneNumber.setValue('3102156154');
    expect(phoneNumber.hasError('pattern')).toBeFalsy();
  })

  it('shoud close modal', () => {
    spyOn(component, 'closeModal');
    spyOn(switchSvc, '$modal').and.returnValue(new EventEmitter(false));
    component.closeModal();
    expect(component.closeModal).toHaveBeenCalled();
  })

  it('should initialize component and subscribe to postData', () => {
    spyOn(switchSvc.$postData, 'subscribe');

    component.ngOnInit();

    expect(switchSvc.$postData.subscribe).toHaveBeenCalled();
    expect(component.error).toEqual('');
  });

  it("should initializze component and get error", () => {  
    spyOn(switchSvc.$postData, 'subscribe');


    component.ngOnInit();
    const spy = spyOn(  userSvc, 'createUser');
    spy.and.callThrough();
    switchSvc.$postData.next({message: 'Error'});
    expect(component.error).toEqual('Error');
  })

  
});
