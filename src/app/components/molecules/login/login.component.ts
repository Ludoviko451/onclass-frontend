import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { LoginDto } from 'src/shared/models/login.dto';
import { constants } from 'src/app/util/constants';
import { SwitchService } from 'src/app/api/switch.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Response } from 'src/shared/models/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() type = '';

  formLogin: FormGroup;
  constants = constants;
  error = '';
  postResponse: Response = { status: 0, message: '' };
  private postUnsubscribe$ = new Subject<void>();
  private loginDTO: LoginDto = constants.emptyLogin;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private switchSvc: SwitchService
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.switchSvc.$postData.pipe(takeUntil(this.postUnsubscribe$)).subscribe((postResponse) => {
      if (postResponse) {
      
        
        this.postResponse = postResponse;
        this.error = postResponse.message;
        this.switchSvc.$modalMessage.emit({ isVisible: true, text: postResponse.message });
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
      this.loginDTO.email = this.formLogin.get('email')?.value;
      this.loginDTO.password = this.formLogin.get('password')?.value;

      this.authService.login(this.loginDTO).subscribe({
  
        error: (error) => {
          this.error = error.message;
        }
      });

      this.formLogin.reset();
    }
  }

  ngOnDestroy(): void {
    this.postUnsubscribe$.unsubscribe()
  }
}
