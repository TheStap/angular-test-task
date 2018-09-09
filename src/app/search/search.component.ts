import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {QUESTIONS_ROUTE} from '../routes';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    query: string;
    loading: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {

    }

    search() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.router.navigate([QUESTIONS_ROUTE], {queryParams: {q: this.query}});
    }

}
