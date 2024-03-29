import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiEventManager, JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import {IChatInfo} from 'app/shared/model/chat-info.model';
import {AccountService} from 'app/core';
import {ChatInfoService} from './chat-info.service';
import {TrackerMsgService} from 'app/core/msgtracker/trackermsg.service';

@Component({
  selector: 'jhi-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit, OnDestroy {
  chatInfos: IChatInfo[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected chatInfoService: ChatInfoService,
              protected jhiAlertService: JhiAlertService,
              protected dataUtils: JhiDataUtils,
              protected eventManager: JhiEventManager,
              protected accountService: AccountService,
              protected msgService: TrackerMsgService) {
    this.msgService.connect();
  }

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

    this.msgService.subscribe();
    this.msgService.receive().subscribe(activity => {
      this.loadAll();
    });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
    this.msgService.unsubscribe();
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

  openForm() {
    document.getElementById('myForm').style.display = 'block';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }

}
