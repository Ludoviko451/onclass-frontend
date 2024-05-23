import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MoleculesModule } from '../molecules.module';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItemComponent } from '../menu-item/menu-item.component';
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculesModule, RouterTestingModule],
      declarations: [MenuComponent, MenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all menu items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('app-menu-item'));
    expect(menuItems.length).toBe(3); // Debe ser igual al número de elementos en el array 'info'
  });

  it('should set correct text and routerLink for each menu item', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('app-menu-item'));
    console.log(menuItems);
    console.log(menuItems.length);
    console.log(component.info.length);

    expect(menuItems.length).toBe(component.info.length);

    menuItems.forEach((menuItem, index) => {
        const textElement = menuItem.nativeElement.textContent;
        const routerLink = menuItem.componentInstance.routerLink;

        expect(textElement).toContain(component.info[index].name);
        expect(routerLink).toBe(component.info[index].url);
    });
});
});
