import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';

@Injectable({
    providedIn: 'root'
})
export class TokenGuard implements CanActivate {
    constructor(private sessionService: SessionService) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = this.sessionService.getToken();
        let result = true;
        if (!token) {
            result = false;
            this.sessionService.redirectUrl = state.url;
            this.sessionService.logout();
        }
        return result;
    }
}

