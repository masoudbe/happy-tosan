import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISuggestionAccept } from 'app/shared/model/suggestion-accept.model';

type EntityResponseType = HttpResponse<ISuggestionAccept>;
type EntityArrayResponseType = HttpResponse<ISuggestionAccept[]>;

@Injectable({ providedIn: 'root' })
export class SuggestionAcceptService {
  public resourceUrl = SERVER_API_URL + 'api/suggestion-accepts';

  constructor(protected http: HttpClient) {}

  create(suggestionAccept: ISuggestionAccept): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(suggestionAccept);
    return this.http
      .post<ISuggestionAccept>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(suggestionAccept: ISuggestionAccept): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(suggestionAccept);
    return this.http
      .put<ISuggestionAccept>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISuggestionAccept>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISuggestionAccept[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(suggestionAccept: ISuggestionAccept): ISuggestionAccept {
    const copy: ISuggestionAccept = Object.assign({}, suggestionAccept, {
      date: suggestionAccept.date != null && suggestionAccept.date.isValid() ? suggestionAccept.date.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((suggestionAccept: ISuggestionAccept) => {
        suggestionAccept.date = suggestionAccept.date != null ? moment(suggestionAccept.date) : null;
      });
    }
    return res;
  }
}
