import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {SearchComponent} from './search/search.component';
import {TokenGuard} from './token.guard';
import {AUTH_ROUTE, SEARCH_ROUTE} from './routes';


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
        ]
    },
    {
        path: '**',
        redirectTo: AUTH_ROUTE,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
