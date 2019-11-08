import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemSuggestionAccept } from 'app/shared/model/system-suggestion-accept.model';
import { SystemSuggestionAcceptService } from './system-suggestion-accept.service';
import { SystemSuggestionAcceptComponent } from './system-suggestion-accept.component';
import { SystemSuggestionAcceptDetailComponent } from './system-suggestion-accept-detail.component';
import { SystemSuggestionAcceptUpdateComponent } from './system-suggestion-accept-update.component';
import { SystemSuggestionAcceptDeletePopupComponent } from './system-suggestion-accept-delete-dialog.component';
import { ISystemSuggestionAccept } from 'app/shared/model/system-suggestion-accept.model';

@Injectable({ providedIn: 'root' })
export class SystemSuggestionAcceptResolve implements Resolve<ISystemSuggestionAccept> {
  constructor(private service: SystemSuggestionAcceptService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISystemSuggestionAccept> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SystemSuggestionAccept>) => response.ok),
        map((systemSuggestionAccept: HttpResponse<SystemSuggestionAccept>) => systemSuggestionAccept.body)
      );
    }
    return of(new SystemSuggestionAccept());
  }
}

export const systemSuggestionAcceptRoute: Routes = [
  {
    path: '',
    component: SystemSuggestionAcceptComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SystemSuggestionAcceptDetailComponent,
    resolve: {
      systemSuggestionAccept: SystemSuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SystemSuggestionAcceptUpdateComponent,
    resolve: {
      systemSuggestionAccept: SystemSuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SystemSuggestionAcceptUpdateComponent,
    resolve: {
      systemSuggestionAccept: SystemSuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const systemSuggestionAcceptPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SystemSuggestionAcceptDeletePopupComponent,
    resolve: {
      systemSuggestionAccept: SystemSuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
