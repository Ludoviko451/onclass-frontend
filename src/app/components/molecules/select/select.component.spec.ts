import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { MoleculesModule } from '../molecules.module';
import { HttpClientModule } from '@angular/common/http';
import { mocks } from 'src/shared/mocks/mocks';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculesModule, HttpClientModule],
      declarations: [ SelectComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a select', () => {
    const select = fixture.nativeElement.querySelector('.select');
    expect(select).toBeTruthy();
  });

  it('should delete a item', () => {
    component.type = "Capacidad";
    component.data = mocks.technologies
    component.deleteItem(component.data[0])
    expect(component.data.length).toBe(1);
  })

  it('should add an item', () => {
    component.data = mocks.technologies
    component.addElement(mocks.onlyOne)
    expect(component.data.length).toBe(2);
  })

  it('should open the select', () => {
    component.openSelect()
    expect(component.dataContainer).toBe("data")
  })
  it('should return capacity list when type is "Bootcamp"', () => {
    // Arrange
    component.type = "Bootcamp";
  
    // Act
    const result = component.dataList();
  
    // Assert
    expect(result).toBe(component.capacityList$);
  });
  
  it('should return technology list when type is "Capacidad"', () => {
    // Arrange
    component.type = "Capacidad";
  
    // Act
    const result = component.dataList();
  
    // Assert
    expect(result).toBe(component.technologyList$);
  });
  
  it('should return null when type is neither "Bootcamp" nor "Capacidad"', () => {
    // Arrange
    component.type = "OtherType";
  
    // Act
    const result = component.dataList();
  
    // Assert
    expect(result).toBeNull();
  });
  
  
});
