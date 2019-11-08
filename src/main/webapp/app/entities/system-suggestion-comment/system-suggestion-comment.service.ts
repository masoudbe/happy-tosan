import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISystemSuggestionComment } from 'app/shared/model/system-suggestion-comment.model';

type EntityResponseType = HttpResponse<ISystemSuggestionComment>;
type EntityArrayResponseType = HttpResponse<ISystemSuggestionComment[]>;

@Injectable({ providedIn: 'root' })
export class SystemSuggestionCommentService {
  public resourceUrl = SERVER_API_URL + 'api/system-suggestion-comments';

  constructor(protected http: HttpClient) {}

  create(systemSuggestionComment: ISystemSuggestionComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestionComment);
    return this.http
      .post<ISystemSuggestionComment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(systemSuggestionComment: ISystemSuggestionComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestionComment);
    return this.http
      .put<ISystemSuggestionComment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISystemSuggestionComment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISystemSuggestionComment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(systemSuggestionComment: ISystemSuggestionComment): ISystemSuggestionComment {
    const copy: ISystemSuggestionComment = Object.assign({}, systemSuggestionComment, {
      date:
        systemSuggestionComment.date != null && systemSuggestionComment.date.isValid()
          ? systemSuggestionComment.date.format(DATE_FORMAT)
          : null
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
      res.body.forEach((systemSuggestionComment: ISystemSuggestionComment) => {
        systemSuggestionComment.date = systemSuggestionComment.date != null ? moment(systemSuggestionComment.date) : null;
      });
    }
    return res;
  }
}
