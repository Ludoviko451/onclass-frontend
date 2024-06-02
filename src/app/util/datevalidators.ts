import { AbstractControl, ValidatorFn } from '@angular/forms';

export const yearValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (!control.value) return null;

  const today = new Date();
  const maxYear = today.getFullYear() + 2;
  const controlDate = new Date(control.value);
  const yearControl = controlDate.getFullYear();

  if (yearControl > maxYear) {
    return { 'yearInvalid': true };
  }

  return null;
};

export const startDateValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (!control.value) return null;

  const today = new Date();

  const inputDate = new Date(control.value);

  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return { 'startDateInvalid': true };
  }

  return null;
};

export const endDateValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  if (!control.value) return null;

  const startDateControl = control.parent?.get('startDate');

  if (startDateControl && startDateControl.value) {
    const startDate = new Date(startDateControl.value);
    const endDate = new Date(control.value);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (endDate < startDate) {
      return { 'endDateInvalid': true };
    }
  }

  return null;
};