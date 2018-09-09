import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(private http: HttpClient) {

    }

    get<T>(queryParams: QueryParams, url: string[]): Observable<T> {
        const {site, apiBaseUrl} = environment;
        const params = {site, ...queryParams};
        return this.http.get<T>(`${apiBaseUrl}${url.join('/')}`, {params});
    }
}

export interface QueryParams {
    [param: string]: any;
}
