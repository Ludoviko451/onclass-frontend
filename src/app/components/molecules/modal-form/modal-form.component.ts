import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private bootcampSvc: BootcampService
  ) {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      dataForm: [{ value: '', disabled: true }] // Initially disabled
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
    if (this.type === "Capacidad" || this.type === "Bootcamp") {
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
    } else if (this.type === "Tecnologia") {

      this.newTechnology.name = this.formCreate.value.name!;
      this.newTechnology.description = this.formCreate.value.description!;
      this.technologySvc.postTechnology(this.newTechnology)
    }
    else if (this.type === "Bootcamp") {

      this.newBootcamp.name = this.formCreate.value.name!;
      this.newBootcamp.description = this.formCreate.value.description!;
      console.log(this.dataList)
      this.newBootcamp.capacityList = this.dataList;
      this.bootcampSvc.postBootcamp(this.newBootcamp)
    }
    this.modalSS.$modalMessage.emit(true);
    this.closeModal();
    this.formCreate.reset();
  }


  onTechnologyListChanged(dataList: ITechnology[] | ICapacity[]): void {
    this.dataList = dataList ?? [];
    this.formCreate.get('dataForm')?.setValue(this.dataList);
  }
}
