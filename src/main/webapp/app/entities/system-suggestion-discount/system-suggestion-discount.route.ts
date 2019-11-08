import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemSuggestionDiscount } from 'app/shared/model/system-suggestion-discount.model';
import { SystemSuggestionDiscountService } from './system-suggestion-discount.service';
import { SystemSuggestionDiscountComponent } from './system-suggestion-discount.component';
import { SystemSuggestionDiscountDetailComponent } from './system-suggestion-discount-detail.component';
import { SystemSuggestionDiscountUpdateComponent } from './system-suggestion-discount-update.component';
import { SystemSuggestionDiscountDeletePopupComponent } from './system-suggestion-discount-delete-dialog.component';
import { ISystemSuggestionDiscount } from 'app/shared/model/system-suggestion-discount.model';

@Injectable({ providedIn: 'root' })
export class SystemSuggestionDiscountResolve implements Resolve<ISystemSuggestionDiscount> {
  constructor(private service: SystemSuggestionDiscountService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISystemSuggestionDiscount> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SystemSuggestionDiscount>) => response.ok),
        map((systemSuggestionDiscount: HttpResponse<SystemSuggestionDiscount>) => systemSuggestionDiscount.body)
      );
    }
    return of(new SystemSuggestionDiscount());
  }
}

export const systemSuggestionDiscountRoute: Routes = [
  {
    path: '',
    component: SystemSuggestionDiscountComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionDiscount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SystemSuggestionDiscountDetailComponent,
    resolve: {
      systemSuggestionDiscount: SystemSuggestionDiscountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionDiscount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SystemSuggestionDiscountUpdateComponent,
    resolve: {
      systemSuggestionDiscount: SystemSuggestionDiscountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionDiscount.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SystemSuggestionDiscountUpdateComponent,
    resolve: {
      systemSuggestionDiscount: SystemSuggestionDiscountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionDiscount.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const systemSuggestionDiscountPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SystemSuggestionDiscountDeletePopupComponent,
    resolve: {
      systemSuggestionDiscount: SystemSuggestionDiscountResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionDiscount.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
