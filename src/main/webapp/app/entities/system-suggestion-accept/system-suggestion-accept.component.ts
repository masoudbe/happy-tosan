import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISystemSuggestionAccept } from 'app/shared/model/system-suggestion-accept.model';
import { AccountService } from 'app/core';
import { SystemSuggestionAcceptService } from './system-suggestion-accept.service';

@Component({
  selector: 'jhi-system-suggestion-accept',
  templateUrl: './system-suggestion-accept.component.html'
})
export class SystemSuggestionAcceptComponent implements OnInit, OnDestroy {
  systemSuggestionAccepts: ISystemSuggestionAccept[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected systemSuggestionAcceptService: SystemSuggestionAcceptService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.systemSuggestionAcceptService
      .query()
      .pipe(
        filter((res: HttpResponse<ISystemSuggestionAccept[]>) => res.ok),
        map((res: HttpResponse<ISystemSuggestionAccept[]>) => res.body)
      )
      .subscribe(
        (res: ISystemSuggestionAccept[]) => {
          this.systemSuggestionAccepts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSystemSuggestionAccepts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISystemSuggestionAccept) {
    return item.id;
  }

  registerChangeInSystemSuggestionAccepts() {
    this.eventSubscriber = this.eventManager.subscribe('systemSuggestionAcceptListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
