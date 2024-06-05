import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { SwitchService } from './switch.service';
import { UserDto } from 'src/shared/models/user.dto';
import { environment } from 'src/environments/environment';
import { mocks } from 'src/shared/mocks/mocks';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;
  let switchService: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, SwitchService]
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    switchService = TestBed.inject(SwitchService);

    spyOn(switchService.$postData, 'next').and.callThrough();
    spyOn(switchService.$modalMessage, 'emit').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create user successfully and emit response', () => {
    const userDto: UserDto = mocks.user
    const typeUrl = '/create';
    const expectedResponse = {
      status: 201,
      message: '¡Usuario Creado!'
    };

    userService.createUser(userDto, typeUrl);

    const req = httpMock.expectOne(environment.apiUser + typeUrl);
    expect(req.request.method).toBe('POST');
    req.flush(userDto); // Simulate a successful response

    expect(switchService.$postData.next).toHaveBeenCalledWith(expectedResponse);
    expect(switchService.$modalMessage.emit).toHaveBeenCalledWith(true);
    expect(userService.postResponse).toEqual(expectedResponse);
  });

  it('should handle error while creating user and emit response', () => {
    const userDto: UserDto = mocks.user
    const typeUrl = '/create';
    const errorResponse = {
      status: 400,
      message: 'Http failure response for http://localhost:8090/auth/create: 400 Bad Request'
    };

    userService.createUser(userDto, typeUrl);

    const req = httpMock.expectOne(environment.apiUser + typeUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ message: errorResponse.message }, { status: errorResponse.status, statusText: 'Bad Request' });

    expect(switchService.$postData.next).toHaveBeenCalledWith(errorResponse);
    expect(switchService.$modalMessage.emit).toHaveBeenCalledWith(true);
    expect(userService.postResponse).toEqual(errorResponse);
  });
});
