import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

declare const SE: any;

@Injectable({
    providedIn: 'root'
})
export class SEService {

    constructor() {

    }

    authenticate(): Subject<AuthData> {
        const subject = new Subject<AuthData>();
        SE.authenticate({
            success: (data: AuthData) => {
                subject.next(data);
            },
            error: (data) => {
                subject.error(data);
            },
            networkUsers: true
        });
        return subject;
    }

    init(): Subject<InitData> {
        const subject = new Subject<InitData>();
        // todo вынести в конфиг
        SE.init({
            clientId: 13060,
            key: 'yVx2*fXozwIGv4FUR9frEA((',
            channelUrl: 'http://localhost:4200/auth',
            complete: (data: InitData) => {
                subject.next(data);
                console.log('Run Example With Version ' + data.version);
            }
        });
        return subject;
    }
}
export interface InitData {
    version: number;
}

export interface AuthData {
    accessToken: string;
    expirationDate: string;
    networkUsers: NetworkUser[];
}

export interface NetworkUser {
    badge_counts: Badgecounts;
    question_count: number;
    answer_count: number;
    last_access_date: number;
    creation_date: number;
    account_id: number;
    reputation: number;
    user_id: number;
    site_url: string;
    site_name: string;
}

export interface Badgecounts {
    bronze: number;
    silver: number;
    gold: number;
}
