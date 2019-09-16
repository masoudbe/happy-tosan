import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ChatInfo } from 'app/shared/model/chat-info.model';
import { ChatInfoService } from './chat-info.service';
import { ChatInfoComponent } from './chat-info.component';
import { ChatInfoDetailComponent } from './chat-info-detail.component';
import { ChatInfoUpdateComponent } from './chat-info-update.component';
import { ChatInfoDeletePopupComponent } from './chat-info-delete-dialog.component';
import { IChatInfo } from 'app/shared/model/chat-info.model';

@Injectable({ providedIn: 'root' })
export class ChatInfoResolve implements Resolve<IChatInfo> {
  constructor(private service: ChatInfoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IChatInfo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ChatInfo>) => response.ok),
        map((chatInfo: HttpResponse<ChatInfo>) => chatInfo.body)
      );
    }
    return of(new ChatInfo());
  }
}

export const chatInfoRoute: Routes = [
  {
    path: '',
    component: ChatInfoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.chatInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChatInfoDetailComponent,
    resolve: {
      chatInfo: ChatInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.chatInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChatInfoUpdateComponent,
    resolve: {
      chatInfo: ChatInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.chatInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChatInfoUpdateComponent,
    resolve: {
      chatInfo: ChatInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.chatInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const chatInfoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ChatInfoDeletePopupComponent,
    resolve: {
      chatInfo: ChatInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bettingApp.chatInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
