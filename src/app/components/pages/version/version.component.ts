import { Component, OnInit, inject } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { SwitchService } from 'src/app/api/switch.service';
import { VersionService } from 'src/app/api/version.service';
import { IVersion } from 'src/shared/models/version.interface';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  versionSvc = inject(VersionService);
  switchSvc = inject(SwitchService);
  public versions$!: Observable<IVersion[]>;
  bootcampId!: number;
  name: string = '';
  modalSwitch = false;
  postResponse: Response = {} as Response;
  private unsubscribe$ = new Subject<void>();
  text = '';

 
  ngOnInit(): void {
    this.switchSvc.$modal.pipe(takeUntil(this.unsubscribe$)).subscribe((valor) => this.modalSwitch = valor);
    this.switchSvc.$postData.pipe(takeUntil(this.unsubscribe$)).subscribe((postResponse) => {
      this.postResponse = postResponse;
      this.text = postResponse.message;
      this.loadVersionList(this.bootcampId);
    })

    const storedBootcamp = localStorage.getItem('bootcamp');
    if (storedBootcamp) {
      const bootcamp = JSON.parse(storedBootcamp);
      this.bootcampId = bootcamp.id;
      this.name = bootcamp.name;
      this.loadVersionList(this.bootcampId);
    }
  }

  openModal(): void {
    this.modalSwitch = true;
  }
  loadVersionList(bootcampId: number): void {
    this.versions$ = this.versionSvc.getVersion(bootcampId).pipe(
      catchError((err) => {
        console.log(err);
        return EMPTY;
      })
    );
  }
}
