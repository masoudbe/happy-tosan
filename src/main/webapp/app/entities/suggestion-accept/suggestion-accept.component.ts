import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISuggestionAccept } from 'app/shared/model/suggestion-accept.model';
import { AccountService } from 'app/core';
import { SuggestionAcceptService } from './suggestion-accept.service';

@Component({
  selector: 'jhi-suggestion-accept',
  templateUrl: './suggestion-accept.component.html'
})
export class SuggestionAcceptComponent implements OnInit, OnDestroy {
  suggestionAccepts: ISuggestionAccept[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected suggestionAcceptService: SuggestionAcceptService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.suggestionAcceptService
      .query()
      .pipe(
        filter((res: HttpResponse<ISuggestionAccept[]>) => res.ok),
        map((res: HttpResponse<ISuggestionAccept[]>) => res.body)
      )
      .subscribe(
        (res: ISuggestionAccept[]) => {
          this.suggestionAccepts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSuggestionAccepts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISuggestionAccept) {
    return item.id;
  }

  registerChangeInSuggestionAccepts() {
    this.eventSubscriber = this.eventManager.subscribe('suggestionAcceptListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
