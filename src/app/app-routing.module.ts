import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {SearchComponent} from './search/search.component';
import {TokenGuard} from './token.guard';
import {AUTH_ROUTE, QUESTIONS_ROUTE, SEARCH_ROUTE} from './routes';
import {QuestionsComponent} from './questions/questions.component';
import {QuestionsResolver} from './questions/questions.resolver';


const routes: Routes = [
    {
        path: AUTH_ROUTE,
        component: AuthComponent
    },
    {
        path: '',
        canActivate: [TokenGuard],
        children: [
            {
                path: '',
                redirectTo: SEARCH_ROUTE,
                pathMatch: 'full'
            },
            {
                path: SEARCH_ROUTE,
                component: SearchComponent
            },
            {
                path: QUESTIONS_ROUTE,
                component: QuestionsComponent,
                resolve: {
                    questions: QuestionsResolver
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: AUTH_ROUTE,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [QuestionsResolver]
})
export class AppRoutingModule {
}
