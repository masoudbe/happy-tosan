import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemSuggestion } from 'app/shared/model/system-suggestion.model';
import { SystemSuggestionService } from './system-suggestion.service';
import { SystemSuggestionComponent } from './system-suggestion.component';
import { SystemSuggestionDetailComponent } from './system-suggestion-detail.component';
import { SystemSuggestionUpdateComponent } from './system-suggestion-update.component';
import { SystemSuggestionDeletePopupComponent } from './system-suggestion-delete-dialog.component';
import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';

@Injectable({ providedIn: 'root' })
export class SystemSuggestionResolve implements Resolve<ISystemSuggestion> {
  constructor(private service: SystemSuggestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISystemSuggestion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SystemSuggestion>) => response.ok),
        map((systemSuggestion: HttpResponse<SystemSuggestion>) => systemSuggestion.body)
      );
    }
    return of(new SystemSuggestion());
  }
}

export const systemSuggestionRoute: Routes = [
  {
    path: '',
    component: SystemSuggestionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SystemSuggestionDetailComponent,
    resolve: {
      systemSuggestion: SystemSuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SystemSuggestionUpdateComponent,
    resolve: {
      systemSuggestion: SystemSuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SystemSuggestionUpdateComponent,
    resolve: {
      systemSuggestion: SystemSuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const systemSuggestionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SystemSuggestionDeletePopupComponent,
    resolve: {
      systemSuggestion: SystemSuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
