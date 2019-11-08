import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Suggestion } from 'app/shared/model/suggestion.model';
import { SuggestionService } from './suggestion.service';
import { SuggestionComponent } from './suggestion.component';
import { SuggestionDetailComponent } from './suggestion-detail.component';
import { SuggestionUpdateComponent } from './suggestion-update.component';
import { SuggestionDeletePopupComponent } from './suggestion-delete-dialog.component';
import { ISuggestion } from 'app/shared/model/suggestion.model';

@Injectable({ providedIn: 'root' })
export class SuggestionResolve implements Resolve<ISuggestion> {
  constructor(private service: SuggestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISuggestion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Suggestion>) => response.ok),
        map((suggestion: HttpResponse<Suggestion>) => suggestion.body)
      );
    }
    return of(new Suggestion());
  }
}

export const suggestionRoute: Routes = [
  {
    path: '',
    component: SuggestionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SuggestionDetailComponent,
    resolve: {
      suggestion: SuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SuggestionUpdateComponent,
    resolve: {
      suggestion: SuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SuggestionUpdateComponent,
    resolve: {
      suggestion: SuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const suggestionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SuggestionDeletePopupComponent,
    resolve: {
      suggestion: SuggestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
