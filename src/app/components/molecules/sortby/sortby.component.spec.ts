import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortbyComponent } from './sortby.component';
import { MoleculesModule } from '../molecules.module';

describe('SortbyComponent', () => {
  let component: SortbyComponent;
  let fixture: ComponentFixture<SortbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MoleculesModule
      ],
      declarations: [ SortbyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the order', (done) => {
    spyOn(component.orderChange, 'emit');

    component.changeOrder();

    setTimeout(() => {
      expect(component.order).toBe(component.desc);
      expect(component.orderChange.emit).toHaveBeenCalledWith(component.desc);
      done();
    }, 300); 
  });
});
