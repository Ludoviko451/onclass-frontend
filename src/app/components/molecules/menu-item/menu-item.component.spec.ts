import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { MoleculesModule } from '../molecules.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculesModule, RouterTestingModule],
      declarations: [ MenuItemComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text', () => {

    component.text = "test-text";
    fixture.detectChanges();

    const spanElement = fixture.nativeElement.querySelector('span');

    expect(spanElement.textContent).toContain(component.text);
  })

  it('should render routerLink', () => {
    component.routerLink = "test-routerLink"
    fixture.detectChanges();
    const routerLinkElement = fixture.nativeElement.querySelector('a');
    
    expect(routerLinkElement.getAttribute('href')).toContain(component.routerLink);
  })
});
