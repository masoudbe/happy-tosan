import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';

type EntityResponseType = HttpResponse<ISystemSuggestion>;
type EntityArrayResponseType = HttpResponse<ISystemSuggestion[]>;

@Injectable({ providedIn: 'root' })
export class SystemSuggestionService {
  public resourceUrl = SERVER_API_URL + 'api/system-suggestions';

  constructor(protected http: HttpClient) {}

  create(systemSuggestion: ISystemSuggestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestion);
    return this.http
      .post<ISystemSuggestion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(systemSuggestion: ISystemSuggestion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestion);
    return this.http
      .put<ISystemSuggestion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISystemSuggestion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISystemSuggestion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(systemSuggestion: ISystemSuggestion): ISystemSuggestion {
    const copy: ISystemSuggestion = Object.assign({}, systemSuggestion, {
      startDate:
        systemSuggestion.startDate != null && systemSuggestion.startDate.isValid() ? systemSuggestion.startDate.format(DATE_FORMAT) : null,
      endDate: systemSuggestion.endDate != null && systemSuggestion.endDate.isValid() ? systemSuggestion.endDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((systemSuggestion: ISystemSuggestion) => {
        systemSuggestion.startDate = systemSuggestion.startDate != null ? moment(systemSuggestion.startDate) : null;
        systemSuggestion.endDate = systemSuggestion.endDate != null ? moment(systemSuggestion.endDate) : null;
      });
    }
    return res;
  }
}
