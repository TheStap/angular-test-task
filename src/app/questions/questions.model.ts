import {Owner} from '../api.service';

export interface Question {
    tags: string[];
    owner: Owner;
    is_answered: boolean;
    view_count: number;
    answer_count: number;
    score: number;
    last_activity_date: number;
    creation_date: number;
    question_id: number;
    link: string;
    title: string;
}
