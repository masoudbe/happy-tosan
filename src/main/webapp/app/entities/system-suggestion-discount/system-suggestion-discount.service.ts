import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISystemSuggestionDiscount } from 'app/shared/model/system-suggestion-discount.model';

type EntityResponseType = HttpResponse<ISystemSuggestionDiscount>;
type EntityArrayResponseType = HttpResponse<ISystemSuggestionDiscount[]>;

@Injectable({ providedIn: 'root' })
export class SystemSuggestionDiscountService {
  public resourceUrl = SERVER_API_URL + 'api/system-suggestion-discounts';

  constructor(protected http: HttpClient) {}

  create(systemSuggestionDiscount: ISystemSuggestionDiscount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestionDiscount);
    return this.http
      .post<ISystemSuggestionDiscount>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(systemSuggestionDiscount: ISystemSuggestionDiscount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(systemSuggestionDiscount);
    return this.http
      .put<ISystemSuggestionDiscount>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISystemSuggestionDiscount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISystemSuggestionDiscount[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(systemSuggestionDiscount: ISystemSuggestionDiscount): ISystemSuggestionDiscount {
    const copy: ISystemSuggestionDiscount = Object.assign({}, systemSuggestionDiscount, {
      startDate:
        systemSuggestionDiscount.startDate != null && systemSuggestionDiscount.startDate.isValid()
          ? systemSuggestionDiscount.startDate.format(DATE_FORMAT)
          : null,
      endDate:
        systemSuggestionDiscount.endDate != null && systemSuggestionDiscount.endDate.isValid()
          ? systemSuggestionDiscount.endDate.format(DATE_FORMAT)
          : null
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
      res.body.forEach((systemSuggestionDiscount: ISystemSuggestionDiscount) => {
        systemSuggestionDiscount.startDate = systemSuggestionDiscount.startDate != null ? moment(systemSuggestionDiscount.startDate) : null;
        systemSuggestionDiscount.endDate = systemSuggestionDiscount.endDate != null ? moment(systemSuggestionDiscount.endDate) : null;
      });
    }
    return res;
  }
}
