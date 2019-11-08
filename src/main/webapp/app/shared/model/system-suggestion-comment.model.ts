import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';

export interface ISystemSuggestionComment {
  id?: number;
  comment?: string;
  date?: Moment;
  user?: IUser;
  suggestion?: ISystemSuggestion;
}

export class SystemSuggestionComment implements ISystemSuggestionComment {
  constructor(
    public id?: number,
    public comment?: string,
    public date?: Moment,
    public user?: IUser,
    public suggestion?: ISystemSuggestion
  ) {}
}
