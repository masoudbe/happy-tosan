import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISystemSuggestionAccept } from 'app/shared/model/system-suggestion-accept.model';

type EntityResponseType = HttpResponse<ISystemSuggestionAccept>;
type EntityArrayResponseType = HttpResponse<ISystemSuggestionAccept[]>;

@Injectable({ providedIn: 'root' })
export class SystemSuggestionAcceptService {
  public resourceUrl = SERVER_API_URL + 'api/system-suggestion-accepts';

  constructor(protected http: HttpClient) {}

  create(systemSuggestionAccept: ISystemSuggestionAccept): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestionAccept);
    return this.http
      .post<ISystemSuggestionAccept>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(systemSuggestionAccept: ISystemSuggestionAccept): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestionAccept);
    return this.http
      .put<ISystemSuggestionAccept>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISystemSuggestionAccept>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISystemSuggestionAccept[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(systemSuggestionAccept: ISystemSuggestionAccept): ISystemSuggestionAccept {
    const copy: ISystemSuggestionAccept = Object.assign({}, systemSuggestionAccept, {
      date:
        systemSuggestionAccept.date != null && systemSuggestionAccept.date.isValid()
          ? systemSuggestionAccept.date.format(DATE_FORMAT)
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
      res.body.forEach((systemSuggestionAccept: ISystemSuggestionAccept) => {
        systemSuggestionAccept.date = systemSuggestionAccept.date != null ? moment(systemSuggestionAccept.date) : null;
      });
    }
    return res;
  }
}
