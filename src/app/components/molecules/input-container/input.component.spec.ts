import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render placeholder', () => {
    component.placeholder = 'test-placeholder';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.getAttribute('placeholder')).toEqual('test-placeholder');
  });

  it('should render a name', () => {
    component.name = 'test-name';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.getAttribute('name')).toEqual('test-name');  
  });

  it('should render a text' , () => { 
    component.text = "test-text"; 
    fixture.detectChanges(); 
    const compiled = fixture.nativeElement as HTMLElement; 
    expect(compiled.querySelector('label')?.textContent).toContain('test-text'); 
  })

  it('should render invalid input', () => {
    component.invalid = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.getAttribute('class')).toContain('invalid-input');
  });

  it('should update value when writeValue is called', () => {
    const newValue = 'test-value';
    component.writeValue(newValue);
    expect(component.value).toBe(newValue);
  });

  it('should call onChange when input value changes', () => {
    spyOn(component, 'onChange');
    const inputElement = fixture.nativeElement.querySelector('input');
    const testValue = 'new value';
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    expect(component.onChange).toHaveBeenCalledWith(testValue);
  });

  it('should call onTouched when input loses focus', () => {
    spyOn(component, 'onTouched');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('blur'));
    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should integrate with Angular Forms', () => {
    const formControl = new FormControl('initial value');
    component.registerOnChange(formControl.setValue.bind(formControl));
    component.registerOnTouched(formControl.markAsTouched.bind(formControl));
    
    fixture.detectChanges();
    
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'updated value';
    inputElement.dispatchEvent(new Event('input'));
    
    expect(formControl.value).toBe('updated value');
  });
});
