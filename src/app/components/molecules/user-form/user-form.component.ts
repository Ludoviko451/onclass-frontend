import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  switchSvc = inject(SwitchService);
  userSvc = inject(UserService);
  formUser: FormGroup;
  user: UserDto = {} as UserDto;
  postResponse: Response = {} as Response;
  error = '';


  constructor(private fb: FormBuilder) {

    this.formUser = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      dni : ['', [Validators.required, Validators.maxLength(12)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(constants.phoneNumberPattern)]]
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
  ngOnInit(): void {
    this.error ='';
    this.switchSvc.$postData.subscribe((value) => {

      this.postResponse = value;
      this.error = this.postResponse.message;
    })
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

    console.log(this.user)

    this.switchSvc.$modal.next(false);
    this.switchSvc.$modalMessage.emit(true);
    this.userSvc.createUser(this.user, this.typeUrl);

    console.log(this.type)
    console.log(this.typeUrl)
    this.formUser.reset();
    this.typeUrl = '';
    this.type = '';
}
}