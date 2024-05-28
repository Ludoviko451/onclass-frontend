import { Component, OnInit, inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VersionService } from 'src/app/api/version.service';
import { IVersion } from 'src/shared/models/version.interface';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  versionSvc = inject(VersionService);
  public versions$!: Observable<IVersion[]>;
  bootcampId!: number;
  name: string = '';

  ngOnInit(): void {
    const storedBootcamp = localStorage.getItem('bootcamp');
    if (storedBootcamp) {
      const bootcamp = JSON.parse(storedBootcamp);
      this.bootcampId = bootcamp.id;
      this.name = bootcamp.name;
      this.loadVersionList(this.bootcampId);
    }
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
