import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListComponent } from './generic-list.component';
import { PagesModule } from '../../pages/pages.module';
import { HttpClientModule } from '@angular/common/http';

describe('GenericListComponent', () => {
  let component: GenericListComponent<any>;
  let fixture: ComponentFixture<GenericListComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesModule, HttpClientModule],
      declarations: [ GenericListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
