import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AUTH_ROUTE} from '../routes';
import {map, mergeMap} from 'rxjs/internal/operators';
import {Answer} from './answers.model';
import {List} from '../model';
import {EMPTY, forkJoin} from 'rxjs/index';

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
                    // return forkJoin(this.apiService.getQuestionsByIds([id]), this.apiService.getAnswersByQuestionId(id)).pipe(map(a => {
                    //     console.log(a);
                    // })).subscribe(r => {
                    //     console.log(r);
                    // })
                    result = forkJoin(this.apiService.getQuestionById(id), this.apiService.getAnswersByQuestionId(id));
                }
                return result;
            }))
            .subscribe((answersList: List<Answer> | never) => {
                console.log(answersList);
                this.answers = answersList ? answersList.items : [];
            }, e => {
                console.log(e);
            });
    }

}
