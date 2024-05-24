import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MoleculesModule } from '../molecules.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculesModule, RouterTestingModule],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo', () => {
    const logo = fixture.nativeElement.querySelector('.nav__logo');
    expect(logo).toBeTruthy();
  });

  it('should have menu items', () => {
    const menuItems = fixture.nativeElement.querySelectorAll('.navbar__item');
    expect(menuItems).toBeTruthy();
  });

  it('should render all menu items', () => {
    const menuItems = fixture.nativeElement.querySelectorAll('.navbar__item');
    expect(menuItems.length).toBe(2); 
  });

  it('should set correct text and routerLink for each menu item', () => {
    const menuItems = fixture.nativeElement.querySelectorAll('.navbar__item');
  
    expect(menuItems.length).toBe(component.routes.length);
  });

});