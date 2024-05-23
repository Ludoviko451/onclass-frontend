import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { AtomsModule } from '../atoms.module';
import { By } from '@angular/platform-browser';
describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomsModule],
      declarations: [TextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text', () => {
    component.text = 'test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text')?.textContent).toContain('test');
  });

  it('should render icon', () => {
    const testIcon = "assets/images/next.svg";
    component.iconClass = testIcon;
    component.hasImage = true;
    
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('.text__icon') as HTMLImageElement;


    expect(imgElement.getAttribute('src')).toEqual(testIcon);

  });


  it('should render text and icon', () => {
    component.text = 'test';
    component.iconClass = 'test-icon';
    component.hasImage = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text')?.textContent).toContain('test');
    expect(compiled.querySelector('.text__icon')?.getAttribute('src')).toContain('test-icon');
  });

  it('should render className', () => {
    component.className = 'test-class';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div') as HTMLDivElement;

    expect(divElement.className).toContain('test-class');
  }); 

  it('should render textClass', () => {
    component.textClass = 'test-text-class';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const spanElement = compiled.querySelector('span') as HTMLSpanElement;

    expect(spanElement.className).toContain('test-text-class');
  });


  it('should render alt', () => {
    component.hasImage = true;
    const testAlt = "test-alt";
    component.alt = testAlt
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('.text__icon') as HTMLImageElement;
    expect(imgElement.getAttribute('alt')).toContain(testAlt);
  });

  it('should render hasImage', () => {
    component.hasImage = true;
    component.alt = 'test';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text__icon')?.getAttribute('alt')).toContain('test');
  });

  
});
