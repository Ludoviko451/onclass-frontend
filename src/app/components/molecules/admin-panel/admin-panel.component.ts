import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';
import { SwitchService } from 'src/app/api/switch.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  type = '';
  showModal = false;
  authSvc = inject(AuthService)
  switchSvc = inject(SwitchService)
  title = ''
  role = ''
  panel = [
    {
      name: "CERRAR SESIÓN",
      type: "logout"
    }
  ]
  constructor() { }

  ngOnInit(): void {

    this.switchSvc.$modal.subscribe((value) => {
      this.showModal = value;
    })

  
    this.role = this.authSvc.currentUserValue.roles[0];
    console.log(this.role)
    switch(this.role) {
      case "ADMIN": {
        this.title = "ADMINISTRADOR"
        this.panel = this.panelAdmin
        break;
      }
      case "TEACHER": {
        this.title = "TUTOR"
        break;
      }
      case "STUDENT": {

        this.title = "ESTUDIANTE"
        break;
      }
    }
  }

  


  panelAdmin = [
    {
      name: "CREAR USUARIO ADMIN",
      type: "admin"
    },
    {
      name: "CREAR USUARIO TUTOR",
      type: "teacher"
    },
    {
      name: "CREAR USUARIO ESTUDIANTE",
      type: "student"
    },
    {
      name: "CERRAR SESION",
      type: "logout"
    }
  ]

  handleOperation(type : string) {
    switch(type) {
      case "admin": {
        this.type = "ADMIN";
        this.showModal = true;
        break;
      }
      case "teacher": {
        this.type = "TUTOR";
        this.showModal = true;
        break;
      }
      case "student": {
        this.type = "ESTUDIANTE"
        this.showModal = true;
        break;
      }
      case "logout": {
        this.authSvc.logout();
        break;
      }
    }
  }
}
