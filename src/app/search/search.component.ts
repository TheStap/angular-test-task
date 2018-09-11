import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QUESTIONS_ROUTE} from '../routes';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    query: string;
    loading: boolean;

    constructor(private router: Router, private notificationsService: NotificationsService) {
    }

    ngOnInit() {

    }

    search() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.router.navigate([QUESTIONS_ROUTE], {queryParams: {q: this.query}})
            .then(navigated => {
                if (!navigated) {
                    this.notificationsService.error('Error', 'Failed to load questions, please try again');
                    this.loading = false;
                }
            });
    }

}
