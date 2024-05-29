import { yearValidator, startDateValidator, endDateValidator } from './datevalidators';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

describe('Custom Validators', () => {

  // Year Validator Tests
  describe('yearValidator', () => {
// Year Validator Tests
    it('should return yearInvalid if the year is more than 2 years in the future', () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() + 3); // Establecer la fecha 3 años en el futuro
    
        const control = new FormControl(today.toISOString().split('T')[0]);
        expect(yearValidator(control)).toEqual({ yearInvalid: true });
    });
    
    it('should return null if the year is within the allowed range', () => {
        const control = new FormControl('2024-01-01');
        expect(yearValidator(control)).toBeNull();
    });
  
    it('should return null if the year is within the allowed range', () => {
      const control = new FormControl('2024-01-01');
      const result: ValidationErrors | null = yearValidator(control);
      expect(result).toBeNull();
    });

    it('should return null if the control value is falsy', () => {
      const control = new FormControl('');
      const result: ValidationErrors | null = yearValidator(control);
      expect(result).toBeNull();
    });
  });

  // Start Date Validator Tests
  describe('startDateValidator', () => {
    it('should return startDateInvalid if the date is in the past', () => {
      const control = new FormControl('2020-01-01');
      const result: ValidationErrors | null = startDateValidator(control);
      expect(result).toEqual({ startDateInvalid: true });
    });

    it('should return null if the date is today or in the future', () => {
      const today = new Date().toISOString().split('T')[0];
      const control = new FormControl(today);
      const result: ValidationErrors | null = startDateValidator(control);
      expect(result).toBeNull();
    });

    it('should return null if the control value is falsy', () => {
      const control = new FormControl('');
      const result: ValidationErrors | null = startDateValidator(control);
      expect(result).toBeNull();
    });
  });

  // End Date Validator Tests
  describe('endDateValidator', () => {
    it('should return endDateInvalid if the end date is before the start date', () => {
      const formGroup = new FormGroup({
        startDate: new FormControl('2024-01-02'),
        endDate: new FormControl('2024-01-01')
      });

      const endDateControl = formGroup.get('endDate');
      const result: ValidationErrors | null = endDateValidator(endDateControl as AbstractControl);
      expect(result).toEqual({ endDateInvalid: true });
    });

    it('should return null if the end date is after the start date', () => {
      const formGroup = new FormGroup({
        startDate: new FormControl('2024-01-01'),
        endDate: new FormControl('2024-01-02')
      });

      const endDateControl = formGroup.get('endDate');
      const result: ValidationErrors | null = endDateValidator(endDateControl as AbstractControl);
      expect(result).toBeNull();
    });

    it('should return null if there is no start date', () => {
      const formGroup = new FormGroup({
        endDate: new FormControl('2024-01-01')
      });

      const endDateControl = formGroup.get('endDate');
      const result: ValidationErrors | null = endDateValidator(endDateControl as AbstractControl);
      expect(result).toBeNull();
    });

    it('should return null if the control value is falsy', () => {
      const formGroup = new FormGroup({
        endDate: new FormControl('')
      });

      const endDateControl = formGroup.get('endDate');
      const result: ValidationErrors | null = endDateValidator(endDateControl as AbstractControl);
      expect(result).toBeNull();
    });
  });
});
