import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampComponent } from './bootcamp.component';
import { PagesModule } from '../pages.module';
import { HttpClientModule } from '@angular/common/http';

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
});
