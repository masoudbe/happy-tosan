import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IChatInfo } from 'app/shared/model/chat-info.model';
import { AccountService } from 'app/core';
import { ChatInfoService } from './chat-info.service';

@Component({
  selector: 'jhi-chat-info',
  templateUrl: './chat-info.component.html'
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  chatInfos: IChatInfo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected chatInfoService: ChatInfoService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.chatInfoService
      .query()
      .pipe(
        filter((res: HttpResponse<IChatInfo[]>) => res.ok),
        map((res: HttpResponse<IChatInfo[]>) => res.body)
      )
      .subscribe(
        (res: IChatInfo[]) => {
          this.chatInfos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInChatInfos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IChatInfo) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInChatInfos() {
    this.eventSubscriber = this.eventManager.subscribe('chatInfoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
