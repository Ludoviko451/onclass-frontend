import { Component } from '@angular/core';
import { RouteImages } from '../../../util/route.images';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  route = RouteImages;
}
