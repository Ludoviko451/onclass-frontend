import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VersionService } from './version.service';
import { ICapacity} from 'src/shared/models/capacity.interface';
import { Response } from 'src/shared/models/response';
import { SwitchService } from './switch.service';
import { ICapacityRequest } from 'src/shared/models/capacity.request';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';
import { IBootcampRequest } from 'src/shared/models/bootcamp.request';
import { IVersion } from 'src/shared/models/version.interface';
import { IVersionRequest } from 'src/shared/models/version.request';
import { mocks } from 'src/shared/mocks/mocks';


describe('VersionService', () => {
  let service: VersionService;
  let httpMock: HttpTestingController;
  let switchService: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VersionService, SwitchService]
    });
    service = TestBed.inject(VersionService);
    httpMock = TestBed.inject(HttpTestingController);
    switchService = TestBed.inject(SwitchService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
    const bootcampId: number = 1;
    const dummyVersion: IVersion[] = mocks.versions;

    service.getVersion(bootcampId).subscribe((version) => {
      expect(version.length).toBe(2);
      expect(version).toEqual(dummyVersion);
    });

    const req = httpMock.expectOne(`${service['_endpoint']}?page=0&size=10&field=id&sortBy=asc&bootcampIds=${bootcampId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyVersion);
  });

  it('should post a version', () => {
    const dummyVersion: IVersionRequest = mocks.versionRequest;
    const successResponse: Response = { status: 201, message: '!Version Creada!' };

    const postVersionSpy = spyOn(switchService.$postData, 'next');

    service.postVersion(dummyVersion);

    const req = httpMock.expectOne(`${service['_endpoint']}`);
    req.flush(successResponse);

    expect(postVersionSpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
      status: 201,
      message: '!Version Creada!'
    }))
    });

    it('should handle post capacity error response', () => {
      const newVersion: IVersionRequest = mocks.versionRequest;
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const errorMessage = 'Http failure response for http://localhost:8080/version/: 400 Bad Request';

      const postVersionSpy = spyOn(switchService.$postData, 'next');

      service.postVersion(newVersion);

      const req = httpMock.expectOne(`${service['_endpoint']}`);
      req.flush({ message: errorMessage }, mockErrorResponse);

      expect(postVersionSpy).toHaveBeenCalledWith(jasmine.objectContaining<Response>({
        status: 400,
        message: errorMessage
    })
    );
});
});

