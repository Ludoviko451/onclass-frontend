import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampComponent } from './bootcamp.component';
import { PagesModule } from '../pages.module';
import { HttpClientModule } from '@angular/common/http';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';

describe('BootcampComponent', () => {
  let component: BootcampComponent;
  let fixture: ComponentFixture<BootcampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampComponent ],
      imports: [PagesModule, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a bootcamp', () => {
    const bootcamp: IBootcamp = {
      id: 1,
      name: 'Bootcamp 1',
      description: 'blabla',
      capacities: []
    }
    component.sendBootcamp(bootcamp);
    expect(localStorage.getItem('bootcamp')).toEqual(JSON.stringify(bootcamp));
  })
});
