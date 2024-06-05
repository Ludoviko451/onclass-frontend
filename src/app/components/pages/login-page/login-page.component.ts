import { Component, OnInit, inject } from '@angular/core';
import { SwitchService } from 'src/app/api/switch.service';
import { RouteImages } from 'src/app/util/route.images';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  switchSvc = inject(SwitchService)      

  route = RouteImages;
  isHidden = true;
  type = ''
  typeButton = [
    {
      name: 'Soy estudiante',
      class: 'form-button__student',
      type: 'Estudiante'
    },

    {
      name: 'Soy tutor',
      class: 'form-button__teacher',
      type: 'Tutor'
    }
  ]

  ngOnInit(): void {
    this.switchSvc.$modal.subscribe((data) => {
      this.isHidden = data
    })
}

  openLogin(type : string) {
    this.type = type;
    this.isHidden = !this.isHidden;
  }
}