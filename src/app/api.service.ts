import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {Question} from './questions/questions.model';
import {List} from './model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private requestService: RequestService) {

    }

    advancedQuestionSearch(params: AdvancedQuestionSearchQueryParams) {
        return this.requestService.get<List<Question>>(params, ['search', 'advanced']);
    }
}

// TODO: add full interface
export interface AdvancedQuestionSearchQueryParams {
    q?: string;
    user?: number;
    tagged?: string[];
}
