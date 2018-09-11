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

    get<T>(queryParams: QueryParams, url: Array<string | number>, needSite = true): Observable<T> {
        const {site, apiBaseUrl} = environment;
        let params;
        if (needSite) {
            params = {site, ...queryParams};
        } else {
            params = queryParams;
        }
        return this.http.get<T>(`${apiBaseUrl}${url.join('/')}`, {params});
    }
}

export interface QueryParams {
    [param: string]: any;
}
