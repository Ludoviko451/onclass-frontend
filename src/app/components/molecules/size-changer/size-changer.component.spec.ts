import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChangerComponent } from './size-changer.component';
import { MoleculesModule } from '../molecules.module';

describe('SizeChangerComponent', () => {
  let component: SizeChangerComponent;
  let fixture: ComponentFixture<SizeChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculesModule],
      declarations: [ SizeChangerComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizeChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the size', () => {
    component.changeSize(2)
    expect(component.actualSize).toBe(2)
  })

  it('should open the options', () => {
    component.openOptions()
    expect(component.optionsSwitch).toBe("options-container")
  })
});
