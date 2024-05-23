import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test: Verificar si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test: Verificar si el evento `buttonClick` se emite al hacer clic en el botón
  it('should emit buttonClick event when button is clicked', () => {
    spyOn(component.buttonClick, 'emit');

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  // Test: Verificar si `className` se aplica correctamente al botón
  it('should apply className to button', () => {
    const testClassName = 'test-class';
    component.className = testClassName;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.classList).toContain(testClassName);
  });

  // Test: Verificar si `disabled` se aplica correctamente al botón
  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  // Test: Verificar si `disabled` no se aplica al botón cuando es false
  it('should not disable the button when disabled is false', () => {
    component.disabled = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeFalse();
  });
});
