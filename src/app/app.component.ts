import { Component, OnInit, inject } from '@angular/core';
import { SwitchService } from './api/switch.service';
import { AuthService } from './api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isStudent = false;
  constructor(private switchSvc: SwitchService, private authSvc: AuthService) { }
  ngOnInit(): void {
    this.switchSvc.$isLoggedIn.subscribe((value) => this.isLoggedIn = value);
    this.authSvc.currentUser.subscribe(user => {
      if (user) {
        this.hasRoleStudent(user);
        this.switchSvc.$isLoggedIn.emit(true);
      } else {
        
        this.switchSvc.$isLoggedIn.emit(false);
      }
    });
  }

  hasRoleStudent(user : any) {
    if (user) {
      if (user.roles.includes('STUDENT')) {
        this.isStudent = true;
      } else {
        this.isStudent = false;
      }
    }
  }
}
