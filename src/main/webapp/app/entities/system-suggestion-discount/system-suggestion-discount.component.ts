import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISystemSuggestionDiscount } from 'app/shared/model/system-suggestion-discount.model';
import { AccountService } from 'app/core';
import { SystemSuggestionDiscountService } from './system-suggestion-discount.service';

@Component({
  selector: 'jhi-system-suggestion-discount',
  templateUrl: './system-suggestion-discount.component.html'
})
export class SystemSuggestionDiscountComponent implements OnInit, OnDestroy {
  systemSuggestionDiscounts: ISystemSuggestionDiscount[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected systemSuggestionDiscountService: SystemSuggestionDiscountService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.systemSuggestionDiscountService
      .query()
      .pipe(
        filter((res: HttpResponse<ISystemSuggestionDiscount[]>) => res.ok),
        map((res: HttpResponse<ISystemSuggestionDiscount[]>) => res.body)
      )
      .subscribe(
        (res: ISystemSuggestionDiscount[]) => {
          this.systemSuggestionDiscounts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSystemSuggestionDiscounts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISystemSuggestionDiscount) {
    return item.id;
  }

  registerChangeInSystemSuggestionDiscounts() {
    this.eventSubscriber = this.eventManager.subscribe('systemSuggestionDiscountListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
