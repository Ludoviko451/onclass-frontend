import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BootcampService } from './bootcamp.service';
import { ICapacity} from 'src/shared/models/capacity.interface';
import { Response } from 'src/shared/models/response';
import { SwitchService } from './switch.service';
import { ICapacityRequest } from 'src/shared/models/capacity.request';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';
import { IBootcampRequest } from 'src/shared/models/bootcamp.request';
import { mocks } from 'src/shared/mocks/mocks';


describe('BootcampService', () => {
  let service: BootcampService;
  let httpMock: HttpTestingController;
  let switchService: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BootcampService, SwitchService]
    });
    service = TestBed.inject(BootcampService);
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
    const dummyBootcamps: IBootcamp[] = mocks.bootcamps;

    service.getData().subscribe((capacities) => {
      expect(capacities.length).toBe(2);
      expect(capacities).toEqual(dummyBootcamps);
    });

    const req = httpMock.expectOne(`${service['_endpoint']}?page=0&size=10&sortBy=asc&capacities=true&field=id`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyBootcamps);
  });

  it('should post a bootcamp', () => {
    const dummyBootcamp: IBootcampRequest = mocks.bootcampRequest
    const successResponse: Response = { status: 201, message: '¡Capacidad Creada!' };

    const postBootcampSpy = spyOn(switchService.$postData, 'next');

    service.postBootcamp(dummyBootcamp);

    const req = httpMock.expectOne(`${service['_endpoint']}`);
    req.flush(successResponse);

    expect(postBootcampSpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
      status: 201,
      message: '!Bootcamp Creado!'
    }))
    });

    it('should handle post capacity error response', () => {
      const newBootcamp: IBootcampRequest =  mocks.bootcampRequest;
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const errorMessage = 'Http failure response for http://localhost:8080/bootcamp/: 400 Bad Request';

      const postBootcampSpy = spyOn(switchService.$postData, 'next');

      service.postBootcamp(newBootcamp);

      const req = httpMock.expectOne(`${service['_endpoint']}`);
      req.flush({ message: errorMessage }, mockErrorResponse);

      expect(postBootcampSpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
        status: 400,
        message: errorMessage
    })
    );
});
});

