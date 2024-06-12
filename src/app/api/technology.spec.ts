import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TechnologyService } from './technology.service';
import { SwitchService } from './switch.service';
import { ITechnologyRequest } from 'src/shared/models/technology.request';
import { Response } from 'src/shared/models/response';

describe('TechnologyService', () => {
  let service: TechnologyService;
  let httpMock: HttpTestingController;
  let switchService: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TechnologyService, SwitchService]
    });
    service = TestBed.inject(TechnologyService);
    httpMock = TestBed.inject(HttpTestingController);
    switchService = TestBed.inject(SwitchService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle post technology success response', () => {
    const newTechnology: ITechnologyRequest = { name: 'New Tech', description: 'Description' };
    const successResponse: Response = { status: 201, message: '¡Tecnología Creada!' };

    const postTechnologySpy = spyOn(switchService.$postData, 'next');

    service.postTechnology(newTechnology);

    const req = httpMock.expectOne(`${service['_endpoint']}`);
    req.flush(successResponse);

    expect(postTechnologySpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
      status: 201,
      message: '¡Tecnología Creada!'
    }));
  });

  it('should handle post technology error response', () => {
    const newTechnology: ITechnologyRequest = { name: 'New Tech', description: 'Description' };
    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const errorMessage = 'Http failure response for http://localhost:8080/technology/: 400 Bad Request';

    const postTechnologySpy = spyOn(switchService.$postData, 'next');

    service.postTechnology(newTechnology);

    const req = httpMock.expectOne(`${service['_endpoint']}`);
    req.flush({ message: errorMessage }, mockErrorResponse);

    expect(postTechnologySpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
      status: 400,
      message: errorMessage
    }));
  });

  it('should change order', () => {
    service.changeOrder();
    expect(service.order).toBe('desc');
  });

  it('should change page', () => {
    service.changePage(1);
    expect(service.page).toBe(1);
  });

  it('should change size', () => {
    service.changeSize(20);
    expect(service.size).toBe(20);
  });
});
