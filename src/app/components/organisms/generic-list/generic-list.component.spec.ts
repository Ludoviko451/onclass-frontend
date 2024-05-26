import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, EMPTY } from 'rxjs';
import { GenericListComponent } from './generic-list.component';
import { PaginationService } from 'src/app/api/pagination.service';
import { SwitchService } from 'src/app/api/switch.service';
import { DataService } from 'src/shared/models/data-service.interface';
import { Response } from 'src/shared/models/response';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { mocks } from 'src/shared/mocks/mocks';

describe('GenericListComponent', () => {
  let component: GenericListComponent<any>;
  let fixture: ComponentFixture<GenericListComponent<any>>;
  let switchServiceSpy: jasmine.SpyObj<SwitchService>;
  let paginationServiceSpy: jasmine.SpyObj<PaginationService>;
  let dataServiceSpy: jasmine.SpyObj<DataService<any>>;

  beforeEach(async () => {
    switchServiceSpy = jasmine.createSpyObj('SwitchService', ['']);
    switchServiceSpy.$modal = new EventEmitter<boolean>();
    switchServiceSpy.$postData = new EventEmitter<Response>();

    paginationServiceSpy = jasmine.createSpyObj('PaginationService', ['']);
    paginationServiceSpy.$sizeChange = new EventEmitter<number>();

    dataServiceSpy = jasmine.createSpyObj('DataService', ['getData', 'changeOrder', 'changePage', 'changeSize']);
    dataServiceSpy.getData.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [GenericListComponent],
      providers: [
        { provide: SwitchService, useValue: switchServiceSpy },
        { provide: PaginationService, useValue: paginationServiceSpy },
        { provide: 'DataService', useValue: dataServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericListComponent);
    component = fixture.componentInstance;
    component.dataService = dataServiceSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change order and reload data list', () => {
    const loadDataListSpy = spyOn(component as any, 'loadDataList').and.callThrough();
  
    component.changeOrder();
  
    expect(dataServiceSpy.changeOrder).toHaveBeenCalled();
    expect(loadDataListSpy).toHaveBeenCalled();
  });

  it('should change size and reload data list', () => {
    const loadDataListSpy = spyOn(component as any, 'loadDataList').and.callThrough();

    component.onSizeChanged(20);

    expect(dataServiceSpy.changeSize).toHaveBeenCalled();
    expect(loadDataListSpy).toHaveBeenCalled();
  })

  it('should change page and reload data list', () => {
    const loadDataListSpy = spyOn(component as any, 'loadDataList').and.callThrough();
    component.onPageChanged(20);

    expect(dataServiceSpy.changePage).toHaveBeenCalled();
    expect(loadDataListSpy).toHaveBeenCalled();

  
  });

  it('should open modal', () => {
    component.openModal();
    switchServiceSpy.$modal.emit(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-form')).toBeTruthy();
  })

  it('should close modal', () => {
    switchServiceSpy.$modal.emit(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-form')).toBeFalsy();
  })

});

