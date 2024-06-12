import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionComponent } from './version.component';
import { PagesModule } from '../pages.module';
import { HttpClientModule } from '@angular/common/http';
import { IBootcamp } from 'src/shared/models/bootcamp.interface';
import { Subject, of } from 'rxjs';
import { SwitchService } from 'src/app/api/switch.service';
import { VersionService } from 'src/app/api/version.service';
import { mocks } from 'src/shared/mocks/mocks';
import { IBootcampRequest } from 'src/shared/models/bootcamp.request';
import { IVersion } from 'src/shared/models/version.interface';

describe('VersionComponent', () => {
  let component: VersionComponent;
  let fixture: ComponentFixture<VersionComponent>;
  let versionSvc: VersionService;
  let switchSvc: SwitchService;

  beforeEach(async () => {
    const switchSvcMock = {
      $modal: new Subject<boolean>(),
      $postData: new Subject<any>()
    };
    
    await TestBed.configureTestingModule({
      imports: [
        PagesModule, HttpClientModule
      ],
      declarations: [ VersionComponent ],
      providers: [{ provide: 'SwitchService', useValue: switchSvcMock }]
    })
    .compileComponents();

    versionSvc = TestBed.inject(VersionService);
    switchSvc = TestBed.inject(SwitchService);
    fixture = TestBed.createComponent(VersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    component.openModal();
    expect(component.modalSwitch).toBeTrue();  
  })

  it('should receive a stored bootcamp', () => {
    
    const bootcamp: IBootcamp = {
      id: 1,
      name: 'Bootcamp 1',
      description: 'blabla',
      capacities: []
    }
    localStorage.setItem('bootcamp', JSON.stringify(bootcamp));
    const parsedBootcamp = JSON.parse(localStorage.getItem('bootcamp')!);
    expect(parsedBootcamp).toEqual(bootcamp);
    expect(component.name).toBe(bootcamp.name);
  })

  it('should initialize list', () => {
    const bootcamp: IBootcamp = {
      id: 1,
      name: 'Bootcamp 1',
      description: 'blabla',
      capacities: []
    }
    component.loadVersionList(bootcamp.id);
    expect(component.versions$).toBeTruthy();
    spyOn(versionSvc, 'getVersion').and.returnValue(of(mocks.versions));
  })

  it('should receive a post message', () => {
    const postResponse = { message: 'Test message' };
    const versions: IVersion[] = mocks.versions;

  
    spyOn(component, 'loadVersionList').and.callFake(() => {
      component.versions$ = of(versions);
    });


    switchSvc.$postData.next(postResponse);

    component.ngOnInit();

    expect(component.text).toBe(postResponse.message);
    expect(component.loadVersionList).toHaveBeenCalledWith(component.bootcampId);
  });
});