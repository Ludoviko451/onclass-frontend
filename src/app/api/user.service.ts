import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/shared/models/response';
import { UserDto } from 'src/shared/models/user.dto';
import { SwitchService } from './switch.service';

@Injectable({providedIn: 'root'})
export class UserService {
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiUser;
    postResponse: Response = {} as Response;
    switchSvc = inject(SwitchService);
    constructor() { }
    

    createUser(user: UserDto, typeUrl: string) {
        this._http.post<UserDto>(this._endpoint + typeUrl , user)

        .subscribe({
            
            next: (createdUser: UserDto) => {

                this.postResponse = {
                    status: 201,
                    message: '¡Usuario Creado!'
                };
                this.switchSvc.$postData.next(this.postResponse);
            },
            error: (error) => {
                console.log(typeUrl)
                this.postResponse = {
                    status: error.status,
                    message: error.message
                };
                this.switchSvc.$postData.next(this.postResponse);
            }
        })
        this.switchSvc.$modalMessage.emit(true)
        
    }

}