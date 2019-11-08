import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';
import { AccountService } from 'app/core';
import { SystemSuggestionService } from './system-suggestion.service';

@Component({
  selector: 'jhi-system-suggestion',
  templateUrl: './system-suggestion.component.html'
})
export class SystemSuggestionComponent implements OnInit, OnDestroy {
  systemSuggestions: ISystemSuggestion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected systemSuggestionService: SystemSuggestionService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.systemSuggestionService
      .query()
      .pipe(
        filter((res: HttpResponse<ISystemSuggestion[]>) => res.ok),
        map((res: HttpResponse<ISystemSuggestion[]>) => res.body)
      )
      .subscribe(
        (res: ISystemSuggestion[]) => {
          this.systemSuggestions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSystemSuggestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISystemSuggestion) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSystemSuggestions() {
    this.eventSubscriber = this.eventManager.subscribe('systemSuggestionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
