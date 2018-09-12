import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Question} from './questions.model';
import {List} from '../model';
import {AdvancedQuestionSearchQueryParams, ApiService} from '../api.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
    questions: Question[] = [];
    quickViewQuestions: Question[] = [];
    quickViewQuestionsLoading = false;
    questionsTitle = '';
    quickViewQuestionsTitle = '';
    private baseTitle = 'Search results by';

    constructor(private route: ActivatedRoute,  private apiService: ApiService, private notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.questionsTitle = `${this.baseTitle} query ${params.q}`;
        });
        this.route.data
            .subscribe((data: { questions: List<Question> }) => {
                this.questions = data.questions.items;
            });
    }

    quickViewSearch(params: AdvancedQuestionSearchQueryParams) {
        this.quickViewQuestionsLoading = true;
        this.apiService.advancedQuestionSearch(params)
            .subscribe((data: List<Question>) => {
                this.quickViewQuestions = data.items;
                this.quickViewQuestionsTitle = `${this.baseTitle} ${Object.keys(params)} ${Object.values(params)}`;
            }, () => {
                this.notificationsService.error('Error', 'failed to load questions');
            }, () => {
                this.quickViewQuestionsLoading = false;
            });
    }

}
