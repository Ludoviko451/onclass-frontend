import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityComponent } from './capacity.component';
import { PagesModule } from '../pages.module';
import { HttpClientModule } from '@angular/common/http';

describe('CapacityComponent', () => {
  let component: CapacityComponent;
  let fixture: ComponentFixture<CapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesModule, HttpClientModule],
      declarations: [ CapacityComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
