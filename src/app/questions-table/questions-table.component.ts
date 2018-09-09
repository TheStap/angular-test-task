import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../questions/questions.model';
import {AdvancedQuestionSearchQueryParams} from '../api.service';

@Component({
    selector: 'app-questions-table',
    templateUrl: './questions-table.component.html',
    styleUrls: ['./questions-table.component.scss']
})
export class QuestionsTableComponent implements OnInit {
    displayedColumns: string[] = ['author', 'title', 'answers count', 'tags'];

    @Input()
    questions: Question[] = [];
    @Output() quickViewSearch = new EventEmitter<AdvancedQuestionSearchQueryParams>();
    @Input()
    loading: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    search(params: AdvancedQuestionSearchQueryParams) {
        this.quickViewSearch.emit(params);
    }

}
