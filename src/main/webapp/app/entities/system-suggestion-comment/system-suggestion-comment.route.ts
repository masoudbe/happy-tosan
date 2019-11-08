import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemSuggestionComment } from 'app/shared/model/system-suggestion-comment.model';
import { SystemSuggestionCommentService } from './system-suggestion-comment.service';
import { SystemSuggestionCommentComponent } from './system-suggestion-comment.component';
import { SystemSuggestionCommentDetailComponent } from './system-suggestion-comment-detail.component';
import { SystemSuggestionCommentUpdateComponent } from './system-suggestion-comment-update.component';
import { SystemSuggestionCommentDeletePopupComponent } from './system-suggestion-comment-delete-dialog.component';
import { ISystemSuggestionComment } from 'app/shared/model/system-suggestion-comment.model';

@Injectable({ providedIn: 'root' })
export class SystemSuggestionCommentResolve implements Resolve<ISystemSuggestionComment> {
  constructor(private service: SystemSuggestionCommentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISystemSuggestionComment> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SystemSuggestionComment>) => response.ok),
        map((systemSuggestionComment: HttpResponse<SystemSuggestionComment>) => systemSuggestionComment.body)
      );
    }
    return of(new SystemSuggestionComment());
  }
}

export const systemSuggestionCommentRoute: Routes = [
  {
    path: '',
    component: SystemSuggestionCommentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SystemSuggestionCommentDetailComponent,
    resolve: {
      systemSuggestionComment: SystemSuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SystemSuggestionCommentUpdateComponent,
    resolve: {
      systemSuggestionComment: SystemSuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SystemSuggestionCommentUpdateComponent,
    resolve: {
      systemSuggestionComment: SystemSuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const systemSuggestionCommentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SystemSuggestionCommentDeletePopupComponent,
    resolve: {
      systemSuggestionComment: SystemSuggestionCommentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.systemSuggestionComment.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
