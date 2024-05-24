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
});
