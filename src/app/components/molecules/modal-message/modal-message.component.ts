import { Component, Input, OnInit } from '@angular/core';

import { RouteImages } from 'src/app/util/route.images';
import { SwitchService } from 'src/app/api/switch.service';
@Component({
    selector: 'app-modal-message',  
    templateUrl: './modal-message.component.html',
    styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent implements OnInit{

    constructor(private modalSS:SwitchService) {
        
    }
    @Input () isSuccessful: boolean | null = false;
    @Input () alt: string = '';
    @Input () text: string = '';

    isVisible: boolean = false;

    route = RouteImages;

    getRoute() {
        if(this.isSuccessful) {
            return this.route.SUCCESS
        } else {
            return this.route.ERROR
        }
    }

    getAlt() {
        if(this.isSuccessful) {
            return 'SUCCESS ICON'
        } else {
            return 'ERROR ICON'
        }
    }
    
    closeModal() {
        this.isVisible = false;
    }

    ngOnInit(): void {
        this.modalSS.$modalMessage.subscribe((valor) => this.isVisible = valor);
    }

}
