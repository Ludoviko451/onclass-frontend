import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SwitchService } from 'src/app/api/switch.service';
import { UserService } from 'src/app/api/user.service';
import { constants } from 'src/app/util/constants';
import { Response } from 'src/shared/models/response';
import { UserDto } from 'src/shared/models/user.dto';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  @Input() type = '';
  typeUrl = "";
  constants = constants;
  formUser: FormGroup;
  user: UserDto = constants.emptyUser;
  postResponse:Response = {status: 0, message: ''}; 
  private postUnsubscribe$ = new Subject<void>();
  text = '';


  constructor(private fb: FormBuilder, private switchSvc: SwitchService, private userSvc: UserService) {

    this.formUser = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      dni : ['', [Validators.required, Validators.maxLength(12)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(constants.phoneNumberPattern)]]
    });
   }
   ngOnInit(): void {
    this.text ='';
    this.switchSvc.$postData.pipe(takeUntil(this.postUnsubscribe$)).subscribe((postResponse) => {
      this.postResponse = postResponse;
      this.text = postResponse.message;

      this.switchSvc.$modalMessage.emit({ isVisible: true});
  
    });
  }
   get name() {
    return this.formUser.get('name') as FormControl;
   }

   get lastName() {
    return this.formUser.get('lastName') as FormControl;
   }
  
   get email() {
    return this.formUser.get('email') as FormControl;
   }

   get password() {
    return this.formUser.get('password') as FormControl;
   }

   get dni() {
    return this.formUser.get('dni') as FormControl;
   }

   get phoneNumber() {
    return this.formUser.get('phoneNumber') as FormControl;
   }


  closeModal() {
    this.switchSvc.$modal.next(false);
    this.formUser.reset();
  }

  registerUser() {
    switch(this.type) {
      case 'TUTOR':
        this.typeUrl = '/registerTeacher';
        break;
      case 'ADMIN':
        this.typeUrl = '/registerAdmin';
        break;
      case 'ESTUDIANTE':
        this.typeUrl = '/registerStudent';
        break;
    }

    this.user = this.formUser.value;

 

    this.switchSvc.$modal.next(false);
   
    this.userSvc.createUser(this.user, this.typeUrl);


    this.formUser.reset();
    this.typeUrl = '';
    this.type = '';
}

  ngOnDestroy(): void {
    this.postUnsubscribe$.unsubscribe();
  }
}