import { Component, HostListener, Inject, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouteImages } from 'src/app/util/route.images';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isVisible = false;
  route = RouteImages;

  constructor(@Inject(DOCUMENT) private document: Document, private authSvc:AuthService) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const panel = this.document.querySelector('app-admin-panel');

    if (panel && !panel.contains(target) && !target.classList.contains('header__user--icon')) {
      this.isVisible = false;
    }
  }

  togglePanel(): void {
    this.isVisible = !this.isVisible;
  }

  logout(): void {
    this.authSvc.logout();
  }
}
