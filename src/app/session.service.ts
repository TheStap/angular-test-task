import {Injectable} from '@angular/core';
import {AuthData, SEService} from './se.service';
import {Router} from '@angular/router';
import {AUTH_ROUTE, SEARCH_ROUTE} from './routes';
import {NotificationsService} from 'angular2-notifications';
import {mergeMap} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private accessToken: string;
    private expirationDate: string;
    redirectUrl: string;

    constructor(private router: Router, private notificationService: NotificationsService, private sEService: SEService) {

    }

    checkExpirationToken() {
        const expirationDate = this.getTokenExpirationDate();
        if (expirationDate) {
            const expirationDateInMs = +new Date(expirationDate);
            const currentDateInMS = +new Date();
            const isTokenExpired =  expirationDateInMs < currentDateInMS;
            if (isTokenExpired) {
                this.logout();
            }
        }
    }

    logout() {
        this.notificationService.info('Authentication needed', 'Please log in again');
        this.clearTokenInfo();
        this.router.navigateByUrl(AUTH_ROUTE);
    }

    login() {
        this.sEService.init()
            .pipe(
                mergeMap(() => this.sEService.authenticate())
            )
            .subscribe(
                (data: AuthData) => {
                    this.setTokenInfo(data);
                    this.notificationService.success('Authorization successful');
                    const url = this.redirectUrl ? this.redirectUrl : SEARCH_ROUTE;
                    console.log(this.redirectUrl);
                    this.router.navigateByUrl(url);
                },
                () => {
                    this.notificationService.success('Error', 'Failed to authenticate, please try again');
                });
    }

    private getTokenExpirationDate() {
        let result = '';
        if (this.expirationDate) {
            result = this.expirationDate;
        } else {
            result = window.localStorage.getItem(LocalStorageKeyEnum.ExpirationDate);
        }
        return result;
    }

    setTokenInfo(accessTokenInfo: AuthData): void {
        const {accessToken, expirationDate} = accessTokenInfo;
        window.localStorage.setItem(LocalStorageKeyEnum.Token, accessToken);
        window.localStorage.setItem(LocalStorageKeyEnum.ExpirationDate, expirationDate);
        this.accessToken = accessToken;
        this.expirationDate = expirationDate;
    }

    getToken(): string {
        let result = '';
        if (this.accessToken) {
            result = this.accessToken;
        } else {
            result = window.localStorage.getItem(LocalStorageKeyEnum.Token);
        }
        return result;
    }

    clearTokenInfo(): void {
        window.localStorage.removeItem(LocalStorageKeyEnum.Token);
        window.localStorage.removeItem(LocalStorageKeyEnum.ExpirationDate);
        this.accessToken = null;
        this.expirationDate = null;
    }
}


export enum LocalStorageKeyEnum {
    Token = 'accessToken',
    ExpirationDate = 'expirationDate'
}
