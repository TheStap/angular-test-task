import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {SessionService} from './session.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        SimpleNotificationsModule.forRoot({
            timeOut: 5000
        })
    ],
    providers: [
        SessionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
