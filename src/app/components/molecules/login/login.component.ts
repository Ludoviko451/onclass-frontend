import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { LoginDto } from 'src/shared/models/login.dto';
import { constants } from 'src/app/util/constants';
import { RouteImages } from 'src/app/util/route.images';
import { SwitchService } from 'src/app/api/switch.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})  


export class LoginComponent implements OnInit {
  @Input() type = '';

  formLogin: FormGroup;
  constants = constants;
  switchSvc = inject(SwitchService);
  modal = false;
  error = '';
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  
  constructor(
    private router: Router,
    private authService: AuthService, 
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.switchSvc.$postData.subscribe((data) => {
      this.error = data.message;
    })
  }

  closeModal() {
    this.switchSvc.$modal.next(true);
    this.formLogin.reset();
  }

  get email() {
    return this.formLogin.get('email') as FormControl;
  }

  get password() {
    return this.formLogin.get('password') as FormControl;
  }

  login(): void {
    if (this.formLogin.valid) {
      const loginDto: LoginDto = {
        email: this.formLogin.get('email')?.value,
        password: this.formLogin.get('password')?.value
      };
 

      this.authService.login(loginDto).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.switchSvc.$modalMessage.emit(true)
        }
        
      });
    }
  }
}
