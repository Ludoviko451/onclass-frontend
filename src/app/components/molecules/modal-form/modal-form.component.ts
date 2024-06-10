import { IVersionRequest } from './../../../../shared/models/version.request';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITechnology } from 'src/shared/models/technology.interface';
import { ITechnologyRequest } from 'src/shared/models/technology.request';
import { ICapacityRequest } from 'src/shared/models/capacity.request';
import { SwitchService } from 'src/app/api/switch.service';
import { TechnologyService } from 'src/app/api/technology.service';
import { CapacityService } from 'src/app/api/capacity.service';
import { constants } from 'src/app/util/constants';
import { ICapacity } from 'src/shared/models/capacity.interface';
import { IBootcampRequest } from 'src/shared/models/bootcamp.request';
import { BootcampService } from 'src/app/api/bootcamp.service';
import { VersionService } from 'src/app/api/version.service';
import { endDateValidator, startDateValidator, yearValidator } from './../../../util/datevalidators';
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit, OnChanges {
  @Input() type: string = "";

  public constants = constants;
  public dataList: ITechnology[] | ICapacity[] = [];

  formCreate: FormGroup;

  newTechnology: ITechnologyRequest = {} as ITechnologyRequest;
  newCapacity: ICapacityRequest = {} as ICapacityRequest;
  newBootcamp: IBootcampRequest = {} as IBootcampRequest;
  newVersion: IVersionRequest = {} as IVersionRequest

  validators = {
    required: "",
    maxlengthMessage: "",
    maxLenght: 0,
    minlengthMessage: "",
    minLenght: 0
  };

  constructor(
    private modalSS: SwitchService,
    private fb: FormBuilder,
    private technologySvc: TechnologyService,
    private capacitySvc: CapacityService,
    private bootcampSvc: BootcampService,
    private versionSvc: VersionService
  ) 
  {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), this.noWhitespaceValidator]],
      description: ['', [Validators.required, Validators.maxLength(90), this.noWhitespaceValidator]],
      dataForm: [{ value: '', disabled: true }],
      maximumCapacity: [{ value: 0, disabled: true }],
      startDate: [{ value: '', disabled: true }],
      endDate: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.setValidators();
    this.updateFormValidators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.setValidators();
      this.updateFormValidators();
    }
  }

  setValidators(): void {
    if (this.type === "Bootcamp") {
      this.validators.maxlengthMessage = this.constants.capacityMaxLenght;
      this.validators.maxLenght = this.constants.capacityValidators.max;
      this.validators.minlengthMessage = this.constants.capacityMinLenght;
      this.validators.minLenght = this.constants.capacityValidators.min;
      this.validators.required = this.constants.capacityRequired;
    } else if (this.type === "Capacidad") {
      this.validators.maxlengthMessage = this.constants.technologyMaxLenght;
      this.validators.maxLenght = this.constants.technologyValidators.max;
      this.validators.minlengthMessage = this.constants.technologyMinLenght;
      this.validators.minLenght = this.constants.technologyValidators.min;
      this.validators.required = this.constants.technologyRequired;
    } else {
      this.validators = {
        required: "",
        maxlengthMessage: "",
        maxLenght: 0,
        minlengthMessage: "",
        minLenght: 0
      };
    }
  }

  updateFormValidators(): void {
    const dataFormControl = this.formCreate.get('dataForm');
    const name = this.formCreate.get('name');
    const description = this.formCreate.get('description');

    if (this.type === "Version"){
      this.name?.disable();
      name?.clearValidators();
      description?.disable();
      description?.clearValidators();
      dataFormControl?.disable();
      dataFormControl?.clearValidators();

      this.maximumCapacity?.enable();
      this.maximumCapacity.setValidators([
        Validators.required,
        Validators.min(constants.maximumCapacityValidators.min),
        Validators.max(constants.maximumCapacityValidators.max)
      ])

      this.startDate.enable();
      this.startDate.setValidators([
        Validators.required,
        startDateValidator,
        yearValidator
      ])
      this.endDate.enable();
      this.endDate.setValidators([
        Validators.required,
        endDateValidator,
        yearValidator
      ])
    }
    else if (this.type === "Capacidad" || this.type === "Bootcamp") {
      dataFormControl?.setValidators([
        Validators.required,
        Validators.maxLength(this.validators.maxLenght),
        Validators.minLength(this.validators.minLenght)
      ]);
      dataFormControl?.enable();
  
    } else {
      dataFormControl?.clearValidators();
      dataFormControl?.disable();
    }
    dataFormControl?.updateValueAndValidity();
  }

  get name() {
    return this.formCreate.get('name') as FormControl;
  }

  get description() {
    return this.formCreate.get('description') as FormControl;
  }

  get dataForm() {
    return this.formCreate.get('dataForm') as FormControl;
  }

  get maximumCapacity() {
    return this.formCreate.get('maximumCapacity') as FormControl;
  }

  get startDate() {
    return this.formCreate.get('startDate') as FormControl;
  }



  get endDate() {
    return this.formCreate.get('endDate') as FormControl;
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  closeModal(): void {
    this.modalSS.$modal.emit(false);
    this.modalSS.$modal.next(false);
  }

  onSubmit() {
    if (this.type === "Capacidad") {
      this.newCapacity.name = this.formCreate.value.name!;
      this.newCapacity.description = this.formCreate.value.description!;
      this.newCapacity.technologyList = this.dataList;
      this.capacitySvc.postCapacity(this.newCapacity)
    } else if (this.type === "Tecnología") {

      this.newTechnology.name = this.formCreate.value.name!;
      this.newTechnology.description = this.formCreate.value.description!;
      this.technologySvc.postTechnology(this.newTechnology)
    }
    else if (this.type === "Bootcamp") {

      this.newBootcamp.name = this.formCreate.value.name!;
      this.newBootcamp.description = this.formCreate.value.description!;
      this.newBootcamp.capacityList = this.dataList;
      this.bootcampSvc.postBootcamp(this.newBootcamp)
    }
    else if (this.type === "Version") {
      this.newVersion.maximumCapacity = this.formCreate.value.maximumCapacity!;
      this.newVersion.startDate = this.formCreate.value.startDate!;
      this.newVersion.endDate = this.formCreate.value.endDate!;
      
      const storedBootcamp = localStorage.getItem('bootcamp');
      if (storedBootcamp) {
        const bootcamp = JSON.parse(storedBootcamp);
        this.newVersion.bootcampId = bootcamp.id;
      }

      this.versionSvc.postVersion(this.newVersion)
    }

    this.closeModal();
    this.formCreate.reset();
  }

  onDataListChanged(dataList: ITechnology[] | ICapacity[]): void {
    this.dataList = dataList ?? [];
    this.formCreate.get('dataForm')?.setValue(this.dataList);
  }
}
