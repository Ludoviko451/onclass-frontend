import { Response } from './../../../../shared/models/response';
import { Component, Input, OnInit } from '@angular/core';
import { RouteImages } from 'src/app/util/route.images';
import { SwitchService } from 'src/app/api/switch.service';

@Component({
    selector: 'app-modal-message',  
    templateUrl: './modal-message.component.html',
    styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent implements OnInit {
    constructor(private modalSS: SwitchService) { }

    @Input() isSuccessful: boolean | null = false;
    @Input() alt: string = '';
    @Input() text: string = '';

    isVisible: boolean = false;
    route = RouteImages;

    getRoute() {
        return this.isSuccessful ? this.route.SUCCESS : this.route.ERROR;
    }

    getAlt() {
        return this.isSuccessful ? 'SUCCESS ICON' : 'ERROR ICON';
    }

    closeModal() {
        this.isVisible = false;
    }

    ngOnInit(): void {
        this.modalSS.$modalMessage.subscribe(({ isVisible, response }) => {
            this.isVisible = isVisible;
            this.text = response;
            if(response.status > 300) {
                this.isSuccessful = false;
            }
            if(response.status < 300) {
                this.isSuccessful = true;
            }
        });
    }
}
