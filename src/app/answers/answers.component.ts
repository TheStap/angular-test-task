import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AUTH_ROUTE} from '../routes';
import {finalize, mergeMap, map} from 'rxjs/internal/operators';
import {Answer} from './answers.model';
import {List} from '../model';
import {EMPTY, forkJoin} from 'rxjs/index';
import {NotificationsService} from 'angular2-notifications';
import {Question} from '../questions/questions.model';

@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
    answers: Answer[] = [];
    loading = false;
    question: Question = null;

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router,
                private notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.loading = true;
        this.route.queryParams.pipe(
            mergeMap((params) => {
                let result;
                const {id} = params;
                if (!id) {
                    this.router.navigateByUrl(AUTH_ROUTE);
                    result = EMPTY;
                } else {
                    result = forkJoin(this.apiService.getAnswersByQuestionId(id), this.apiService.getQuestionById(id)).pipe(
                        finalize(() => {
                            this.loading = false;
                        })
                    );
                }
                return result;
            })
        )
            .subscribe((questionAndAnswersList: [List<Answer>, Question] | never) => {
                const [answersList, question] = questionAndAnswersList;
                this.answers = answersList ? answersList.items : [];
                this.question = question;
            }, () => {
                this.notificationsService.error('Error', 'failed to load answers');
            });
    }

}
