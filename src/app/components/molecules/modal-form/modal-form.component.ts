import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ITechnology } from 'src/shared/models/technology.interface';
import { ITechnologyRequest } from 'src/shared/models/technology.request';
import { ICapacityRequest } from 'src/shared/models/capacity.request';
import { SwitchService } from 'src/app/api/switch.service';
import { TechnologyService } from 'src/app/api/technology.service';
import { CapacityService } from 'src/app/api/capacity.service';
import { formErrors } from 'src/app/util/error.constants';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  @Input() type: string = "";

  public formErrors = formErrors;
  public technologies: ITechnology[] = [];
  public technologyList$!: Observable<ITechnology[]>;

  formCreate: FormGroup;

  newTechnology: ITechnologyRequest = {} as ITechnologyRequest;
  newCapacity: ICapacityRequest = {} as ICapacityRequest;

  constructor(
    private modalSS: SwitchService,
    private fb: FormBuilder,
    private technologySvc: TechnologyService,
    private capacitySvc: CapacityService
  ) {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]],
      technologiesForm: [{ value: this.technologies, disabled: this.type !== 'Capacidad' }, [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.technologyList$ = this.technologySvc.getTechnologies().pipe(
      catchError((err) => {
        return EMPTY;
      })
    );

    this.technologyList$.subscribe({
      next: (data) => {
        this.technologies = data;
        this.formCreate.get('technologiesForm')?.setValue(this.technologies);
      },
      error: (err) => {
        console.error('Error fetching technologies:', err);
      }
    });

    console.log(this.technologyList$);
  }

  get name() {
    return this.formCreate.get('name') as FormControl;
  }

  get description() {
    return this.formCreate.get('description') as FormControl;
  }

  get technologiesForm() {
    return this.formCreate.get('technologiesForm') as FormControl;
  }

  closeModal(): void {
    this.modalSS.$modal.emit(false);
    this.modalSS.$modal.next(false);
  }

  onSubmit() {
    if (this.type === "Capacidad") {
      this.newCapacity.name = this.formCreate.value.name!;
      this.newCapacity.description = this.formCreate.value.description!;
      this.newCapacity.technologyList = this.technologies;

      console.log(this.newCapacity);
    } else if (this.type === "Tecnologia") {


      this.newTechnology.name = this.formCreate.value.name!;
      this.newTechnology.description = this.formCreate.value.description!;

      this.technologySvc.postTechnology(this.newTechnology)
    }

    this.modalSS.$modalMessage.emit(true);
    this.closeModal();
    this.formCreate.reset();
  }


  onTechnologyListChanged(technologies: ITechnology[]): void {
    this.technologies = technologies ?? [];
    this.formCreate.get('technologiesForm')?.setValue(this.technologies);
  }
}
