import { Component, OnInit, inject } from '@angular/core';
import { SwitchService } from './api/switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  switchSvc = inject(SwitchService);

  ngOnInit(): void {
    this.switchSvc.$isLoggedIn.subscribe((value) => this.isLoggedIn = value);
    
    // Verificar el estado de inicio de sesión al inicializar el componente
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.switchSvc.$isLoggedIn.emit(true);
    } else {
      this.switchSvc.$isLoggedIn.emit(false);
    }
  }
}
