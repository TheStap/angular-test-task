import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Question} from './questions/questions.model';
import {List} from './model';
import {Answer} from './answers/answers.model';
import {map} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private requestService: RequestService) {

    }

    advancedQuestionSearch(params: AdvancedQuestionSearchQueryParams) {
        return this.requestService.get<List<Question>>(params, ['search', 'advanced']);
    }

    getAnswersByQuestionId(id: number) {
        const params = {filter: '!9Z(-wzu0T'}; // add body field to response
        return this.requestService.get<List<Answer>>(params, ['questions', id, 'answers']);
    }

    checkToken(token: string) {
        return this.requestService.get<List<AccessToken>>({}, ['access-tokens', token], false).pipe(map(list => !!list.items.length));
    }
}

// TODO: add full interface
export interface AdvancedQuestionSearchQueryParams {
    q?: string;
    user?: number;
    tagged?: string[];
}


export interface Owner {
    reputation: number;
    user_id: number;
    user_type: string;
    accept_rate: number;
    profile_image: string;
    display_name: string;
    link: string;
}

export interface AccessToken {
    account_id: number;
    expires_on_date: number;
    access_token: string;
}
