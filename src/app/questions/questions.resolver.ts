import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Question} from './questions.model';
import {List} from '../model';
import {ApiService} from '../api.service';


@Injectable()
export class QuestionsResolver implements Resolve<any> {
    constructor(private apiService: ApiService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<List<Question>> {
        return this.apiService.advancedQuestionSearch(route.queryParams);
    }
}
