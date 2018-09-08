import {Component, OnInit} from '@angular/core';
import {SessionService} from '../session.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(private sessionService: SessionService) {
    }

    ngOnInit() {

    }

    login() {
        this.sessionService.login();
    }
}
