import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, EMPTY, throwError } from 'rxjs';
import { GenericListComponent } from './generic-list.component';
import { PaginationService } from 'src/app/api/pagination.service';
import { SwitchService } from 'src/app/api/switch.service';
import { DataService } from 'src/shared/models/data-service.interface';
import { Response } from 'src/shared/models/response';
import { By } from '@angular/platform-browser';
import { EventEmitter } from '@angular/core';
import { mocks } from 'src/shared/mocks/mocks';
import { constants } from 'src/app/util/constants';

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


  describe('noDataMessage', () => {
    it('should return "Crea un Bootcamp" when type is Bootcamp', () => {
      component.type = 'Bootcamp';
      expect(component.noDataMesage()).toBe('Crea un Bootcamp');
    });

    it('should return "Crea una capacidad" when type is Capacidad', () => {
      component.type = 'Capacidad';
      expect(component.noDataMesage()).toBe('Crea una capacidad');
    });

    it('should return "Crea una tecnología" when type is Tecnología', () => {
      component.type = 'Tecnología';
      expect(component.noDataMesage()).toBe('Crea una tecnología');
    });

    it('should return "Tipo no valido" for any other type', () => {
      component.type = 'OtroTipo';
      expect(component.noDataMesage()).toBe('Tipo no valido');
    });
  });

  it('should load data list', () => {
    component.errorMessage.message = constants.dataNotFound;
    component.type = "Bootcamp"

    const loadDataListSpy = spyOn(component as any, 'loadDataList').and.callThrough();
    component.loadDataList();
    expect(loadDataListSpy).toHaveBeenCalled();
  })

  it('should set noDataMessage correctly based on type', () => {
    component.type = 'Bootcamp';
    expect(component.noDataMesage()).toBe('Crea un Bootcamp');

    component.type = 'Capacidad';
    expect(component.noDataMesage()).toBe('Crea una capacidad');

    component.type = 'Tecnología';
    expect(component.noDataMesage()).toBe('Crea una tecnología');

    component.type = 'OtroTipo';
    expect(component.noDataMesage()).toBe('Tipo no valido');
  });

  it('should handle error and set errorMessage', (done) => {
    const mockError = { status: 404, message: constants.dataNotFound };
    dataServiceSpy.getData.and.returnValue(throwError( () => mockError));
    component.type = 'Bootcamp';
    component.loadDataList();

  
    component.dataList$.subscribe({
      next: () => fail('expected an error, not data'),
      error: () => fail('expected to handle the error, not to emit it'),
      complete: () => {
     
        expect(component.errorMessage.status).toBe(mockError.status);
        expect(component.errorMessage.message).toBe('Crea un Bootcamp'); 
        done();
      }
    });
  });
  
});

