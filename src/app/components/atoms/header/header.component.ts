import { Component, inject } from '@angular/core';
import { RouteImages } from '../../../util/route.images';
import { AuthService } from 'src/app/api/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  authSvc = inject(AuthService);

  logout() {
    this.authSvc.logout();
    
  }
  route = RouteImages;
}
