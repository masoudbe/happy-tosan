import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChatInfo } from 'app/shared/model/chat-info.model';

type EntityResponseType = HttpResponse<IChatInfo>;
type EntityArrayResponseType = HttpResponse<IChatInfo[]>;

@Injectable({ providedIn: 'root' })
export class ChatInfoService {
  public resourceUrl = SERVER_API_URL + 'api/chat-infos';

  constructor(protected http: HttpClient) {}

  create(chatInfo: IChatInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chatInfo);
    return this.http
      .post<IChatInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chatInfo: IChatInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chatInfo);
    return this.http
      .put<IChatInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChatInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChatInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chatInfo: IChatInfo): IChatInfo {
    const copy: IChatInfo = Object.assign({}, chatInfo, {
      sentDate: chatInfo.sentDate != null && chatInfo.sentDate.isValid() ? chatInfo.sentDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sentDate = res.body.sentDate != null ? moment(res.body.sentDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((chatInfo: IChatInfo) => {
        chatInfo.sentDate = chatInfo.sentDate != null ? moment(chatInfo.sentDate) : null;
      });
    }
    return res;
  }
}
