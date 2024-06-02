import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouteImages } from '../../../util/route.images';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct user icon src', () => {
    const imgElement = fixture.debugElement.query(By.css('.header__user--icon')).nativeElement;
    const expectedSrc = 'assets/images/userIcon.svg';

    // Normalizar las rutas removiendo el prefijo './' si está presente
    const normalizeUrl = (url: string) => url.replace(/^(\.\/|\/)/, '');

    expect(normalizeUrl(imgElement.getAttribute('src'))).toEqual(normalizeUrl(expectedSrc));
  });
});
