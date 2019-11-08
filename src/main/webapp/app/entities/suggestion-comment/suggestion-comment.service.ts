import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISuggestionComment } from 'app/shared/model/suggestion-comment.model';

type EntityResponseType = HttpResponse<ISuggestionComment>;
type EntityArrayResponseType = HttpResponse<ISuggestionComment[]>;

@Injectable({ providedIn: 'root' })
export class SuggestionCommentService {
  public resourceUrl = SERVER_API_URL + 'api/suggestion-comments';

  constructor(protected http: HttpClient) {}

  create(suggestionComment: ISuggestionComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(suggestionComment);
    return this.http
      .post<ISuggestionComment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(suggestionComment: ISuggestionComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(suggestionComment);
    return this.http
      .put<ISuggestionComment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISuggestionComment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISuggestionComment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(suggestionComment: ISuggestionComment): ISuggestionComment {
    const copy: ISuggestionComment = Object.assign({}, suggestionComment, {
      date: suggestionComment.date != null && suggestionComment.date.isValid() ? suggestionComment.date.format(DATE_FORMAT) : null
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
      res.body.forEach((suggestionComment: ISuggestionComment) => {
        suggestionComment.date = suggestionComment.date != null ? moment(suggestionComment.date) : null;
      });
    }
    return res;
  }
}
