import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SuggestionAccept } from 'app/shared/model/suggestion-accept.model';
import { SuggestionAcceptService } from './suggestion-accept.service';
import { SuggestionAcceptComponent } from './suggestion-accept.component';
import { SuggestionAcceptDetailComponent } from './suggestion-accept-detail.component';
import { SuggestionAcceptUpdateComponent } from './suggestion-accept-update.component';
import { SuggestionAcceptDeletePopupComponent } from './suggestion-accept-delete-dialog.component';
import { ISuggestionAccept } from 'app/shared/model/suggestion-accept.model';

@Injectable({ providedIn: 'root' })
export class SuggestionAcceptResolve implements Resolve<ISuggestionAccept> {
  constructor(private service: SuggestionAcceptService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISuggestionAccept> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SuggestionAccept>) => response.ok),
        map((suggestionAccept: HttpResponse<SuggestionAccept>) => suggestionAccept.body)
      );
    }
    return of(new SuggestionAccept());
  }
}

export const suggestionAcceptRoute: Routes = [
  {
    path: '',
    component: SuggestionAcceptComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SuggestionAcceptDetailComponent,
    resolve: {
      suggestionAccept: SuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SuggestionAcceptUpdateComponent,
    resolve: {
      suggestionAccept: SuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SuggestionAcceptUpdateComponent,
    resolve: {
      suggestionAccept: SuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const suggestionAcceptPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SuggestionAcceptDeletePopupComponent,
    resolve: {
      suggestionAccept: SuggestionAcceptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionAccept.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
