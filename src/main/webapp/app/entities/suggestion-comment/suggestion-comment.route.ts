import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SuggestionComment } from 'app/shared/model/suggestion-comment.model';
import { SuggestionCommentService } from './suggestion-comment.service';
import { SuggestionCommentComponent } from './suggestion-comment.component';
import { SuggestionCommentDetailComponent } from './suggestion-comment-detail.component';
import { SuggestionCommentUpdateComponent } from './suggestion-comment-update.component';
import { SuggestionCommentDeletePopupComponent } from './suggestion-comment-delete-dialog.component';
import { ISuggestionComment } from 'app/shared/model/suggestion-comment.model';

@Injectable({ providedIn: 'root' })
export class SuggestionCommentResolve implements Resolve<ISuggestionComment> {
  constructor(private service: SuggestionCommentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISuggestionComment> {
    const id = route.params['id'] ? route.params['id'] : null;
    if(id){
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SuggestionComment>) => response.ok),
        map((suggestionComment: HttpResponse<SuggestionComment>) => suggestionComment.body)
      );
    }
    return of(new SuggestionComment());
  }
}

export const suggestionCommentRoute: Routes = [
  {
    path: '',
    component: SuggestionCommentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/suggestionView',
    component: SuggestionCommentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SuggestionCommentDetailComponent,
    resolve: {
      suggestionComment: SuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SuggestionCommentUpdateComponent,
    resolve: {
      suggestionComment: SuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SuggestionCommentUpdateComponent,
    resolve: {
      suggestionComment: SuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const suggestionCommentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SuggestionCommentDeletePopupComponent,
    resolve: {
      suggestionComment: SuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.suggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
