import { Component, HostListener, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { LoginDto } from 'src/shared/models/login.dto';
import { constants } from 'src/app/util/constants';
import { SwitchService } from 'src/app/api/switch.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() type = '';

  formLogin: FormGroup;
  constants = constants;
  switchSvc = inject(SwitchService);
  error = '';
  private message$ = new Subject<void>();


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
    this.switchSvc.$postData.pipe(takeUntil(this.message$)).subscribe((data) => {
      if (data) {
        this.error = data.message;
      }
    });
  }



  closeForm() {
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
          
          this.error = error.message;
        }
      });

      this.formLogin.reset();
    }
  }

  ngOnDestroy(): void {
    this.message$.unsubscribe();
  }
}
