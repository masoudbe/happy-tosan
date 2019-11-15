import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISuggestion } from 'app/shared/model/suggestion.model';
import { AccountService } from 'app/core';
import { SuggestionService } from './suggestion.service';

@Component({
  selector: 'jhi-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit, OnDestroy {
  suggestions: ISuggestion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected suggestionService: SuggestionService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.suggestionService
      .query()
      .pipe(
        filter((res: HttpResponse<ISuggestion[]>) => res.ok),
        map((res: HttpResponse<ISuggestion[]>) => res.body)
      )
      .subscribe(
        (res: ISuggestion[]) => {
          this.suggestions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSuggestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISuggestion) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSuggestions() {
    this.eventSubscriber = this.eventManager.subscribe('suggestionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
