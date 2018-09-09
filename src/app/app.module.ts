import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
    MatTableModule
} from '@angular/material';
import {SessionService} from './session.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SearchComponent } from './search/search.component';
import { HttpClientModule }    from '@angular/common/http';
import { QuestionsComponent } from './questions/questions.component';
import {FormsModule} from '@angular/forms';
import { QuestionsTableComponent } from './questions-table/questions-table.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        SearchComponent,
        QuestionsComponent,
        QuestionsTableComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatInputModule,
        SimpleNotificationsModule.forRoot({
            timeOut: 5000
        }),
        HttpClientModule
    ],
    providers: [
        SessionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
