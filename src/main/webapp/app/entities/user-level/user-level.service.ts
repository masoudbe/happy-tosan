import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserLevel } from 'app/shared/model/user-level.model';

type EntityResponseType = HttpResponse<IUserLevel>;
type EntityArrayResponseType = HttpResponse<IUserLevel[]>;

@Injectable({ providedIn: 'root' })
export class UserLevelService {
  public resourceUrl = SERVER_API_URL + 'api/user-levels';

  constructor(protected http: HttpClient) {}

  create(userLevel: IUserLevel): Observable<EntityResponseType> {
    return this.http.post<IUserLevel>(this.resourceUrl, userLevel, { observe: 'response' });
  }

  update(userLevel: IUserLevel): Observable<EntityResponseType> {
    return this.http.put<IUserLevel>(this.resourceUrl, userLevel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserLevel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserLevel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
