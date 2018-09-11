import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../questions/questions.model';
import {AdvancedQuestionSearchQueryParams} from '../api.service';
import {ANSWERS_ROUTE} from '../routes';
import {Router} from '@angular/router';

@Component({
    selector: 'app-questions-table',
    templateUrl: './questions-table.component.html',
    styleUrls: ['./questions-table.component.scss']
})
export class QuestionsTableComponent implements OnInit {
    displayedColumns: string[] = ['author', 'title', 'answers count', 'tags'];

    showAnswersTitle = 'Show answers';

    @Input()
    title = '';

    @Input()
    questions: Question[] = [];

    @Output()
    quickViewSearch = new EventEmitter<AdvancedQuestionSearchQueryParams>();

    @Input()
    loading: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    search(params: AdvancedQuestionSearchQueryParams) {
        this.quickViewSearch.emit(params);
    }

    answerRedirect(questionId: number): void {
        this.router.navigate([ANSWERS_ROUTE], {queryParams: {id: questionId}});
    }

    getShowQuestionsTitleByName(nameType: string, name: string): string {
        return `Show questions by ${nameType} ${name}`;
    }
}

