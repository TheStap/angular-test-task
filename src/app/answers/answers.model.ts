import {Owner} from '../api.service';

export interface Answer {
    owner: Owner;
    is_accepted: boolean;
    score: number;
    last_activity_date: number;
    creation_date: number;
    answer_id: number;
    question_id: number;
    body: string;
};
