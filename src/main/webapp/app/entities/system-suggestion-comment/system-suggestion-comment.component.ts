import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISystemSuggestionComment } from 'app/shared/model/system-suggestion-comment.model';
import { AccountService } from 'app/core';
import { SystemSuggestionCommentService } from './system-suggestion-comment.service';

@Component({
  selector: 'jhi-system-suggestion-comment',
  templateUrl: './system-suggestion-comment.component.html'
})
export class SystemSuggestionCommentComponent implements OnInit, OnDestroy {
  systemSuggestionComments: ISystemSuggestionComment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected systemSuggestionCommentService: SystemSuggestionCommentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.systemSuggestionCommentService
      .query()
      .pipe(
        filter((res: HttpResponse<ISystemSuggestionComment[]>) => res.ok),
        map((res: HttpResponse<ISystemSuggestionComment[]>) => res.body)
      )
      .subscribe(
        (res: ISystemSuggestionComment[]) => {
          this.systemSuggestionComments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSystemSuggestionComments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISystemSuggestionComment) {
    return item.id;
  }

  registerChangeInSystemSuggestionComments() {
    this.eventSubscriber = this.eventManager.subscribe('systemSuggestionCommentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
