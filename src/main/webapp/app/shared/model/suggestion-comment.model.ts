import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ISuggestion } from 'app/shared/model/suggestion.model';

export interface ISuggestionComment {
  id?: number;
  comment?: string;
  date?: Moment;
  user?: IUser;
  suggestion?: ISuggestion;
}

export class SuggestionComment implements ISuggestionComment {
  constructor(public id?: number, public comment?: string, public date?: Moment, public user?: IUser, public suggestion?: ISuggestion) {}
}
