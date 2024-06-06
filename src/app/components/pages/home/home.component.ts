import { Component, OnInit, inject,} from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';
import { constants } from 'src/app/util/constants';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {
        this.verifyRole()
        this.typeMessage()
    }
    authSvc = inject(AuthService);
    message = '';
    isVisible = false
    type = ''
    verifyRole(){
        if(this.authSvc.hasRole("ADMIN")){
            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    }

    typeMessage(){

        if(this.authSvc.hasRole("STUDENT")){
            
            this.message = constants.studentHome
        } else if (this.authSvc.hasRole("TEACHER")){
            this.message = constants.teacherHome
        }
    }
}
