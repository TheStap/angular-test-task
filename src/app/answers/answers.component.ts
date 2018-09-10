import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AUTH_ROUTE} from '../routes';
import {mergeMap} from 'rxjs/internal/operators';
import {Answer} from './answers.model';
import {List} from '../model';
import {EMPTY} from 'rxjs/index';

@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
    answers: Answer[] = [];

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.queryParams.pipe(
            mergeMap((params) => {
                let result;
                const {id} = params;
                if (!id) {
                    this.router.navigateByUrl(AUTH_ROUTE);
                    result = EMPTY;
                } else {
                    result = this.apiService.getAnswersByQuestionId(id);
                }
                return result;
            }))
            .subscribe((answersList: List<Answer> | never) => {
                this.answers = answersList ? answersList.items : [];
            }, e => {
                console.log(e);
            });
    }

}
