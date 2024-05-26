import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CapacityService } from './capacity.service';
import { ICapacity} from 'src/shared/models/capacity.interface';
import { Response } from 'src/shared/models/response';
import { SwitchService } from './switch.service';
import { environment } from 'src/environments/environment';
import { ICapacityRequest } from 'src/shared/models/capacity.request';


describe('CapacityService', () => {
  let service: CapacityService;
  let httpMock: HttpTestingController;
  let switchService: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapacityService, SwitchService]
    });
    service = TestBed.inject(CapacityService);
    httpMock = TestBed.inject(HttpTestingController);
    switchService = TestBed.inject(SwitchService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change order', () => {
    service.order = 'asc';
    service.changeOrder();
    expect(service.order).toBe('desc');
    service.changeOrder();
    expect(service.order).toBe('asc');
  });

  it('should change page', () => {
    service.changePage(2);
    expect(service.page).toBe(2);
  });

  it('should change size', () => {
    service.changeSize(20);
    expect(service.size).toBe(20);
  });

  it('should fetch data', () => {
    const dummyCapacities: ICapacity[] = [
      { id: 1, name: 'Capacity 1', description: 'Description 1', technologies: [] },
      { id: 2, name: 'Capacity 2', description: 'Description 2', technologies: [] }
    ];

    service.getData().subscribe((capacities) => {
      expect(capacities.length).toBe(2);
      expect(capacities).toEqual(dummyCapacities);
    });

    const req = httpMock.expectOne(`${service['_endpoint']}?page=0&size=10&sortBy=asc&technologies=true&field=name`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCapacities);
  });

  it('should post a capacity', () => {
    const dummyCapacity: ICapacityRequest = {name: 'Capacity 1', description: 'Description 1', technologyList: [] };
    const successResponse: Response = { status: 201, message: '¡Capacidad Creada!' };

    const postCapacitySpy = spyOn(switchService.$postData, 'next');

    service.postCapacity(dummyCapacity);

    const req = httpMock.expectOne(`${service['_endpoint']}`);
    req.flush(successResponse);

    expect(postCapacitySpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
      status: 201,
      message: '¡Capacidad Creada!'
    }))
    });

    it('should handle post capacity error response', () => {
      const newCapacity: ICapacityRequest = {name: 'Capacity 1', description: 'Description 1', technologyList: [] };
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const errorMessage = 'Http failure response for http://localhost:8080/capacity/: 400 Bad Request';

      const postCapacitySpy = spyOn(switchService.$postData, 'next');

      service.postCapacity(newCapacity);

      const req = httpMock.expectOne(`${service['_endpoint']}`);
      req.flush({ message: errorMessage }, mockErrorResponse);

      expect(postCapacitySpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
        status: 400,
        message: errorMessage
    })
    );
    });
});

