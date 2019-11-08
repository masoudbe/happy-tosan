import { Moment } from 'moment';
import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';

export interface ISystemSuggestionDiscount {
  id?: number;
  comment?: string;
  startDate?: Moment;
  endDate?: Moment;
  discountPercent?: number;
  acceptCount?: number;
  suggestion?: ISystemSuggestion;
}

export class SystemSuggestionDiscount implements ISystemSuggestionDiscount {
  constructor(
    public id?: number,
    public comment?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public discountPercent?: number,
    public acceptCount?: number,
    public suggestion?: ISystemSuggestion
  ) {}
}
