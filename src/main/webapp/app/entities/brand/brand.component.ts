import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBrand } from 'app/shared/model/brand.model';
import { AccountService } from 'app/core';
import { BrandService } from './brand.service';

@Component({
  selector: 'jhi-brand',
  templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit, OnDestroy {
  brands: IBrand[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected brandService: BrandService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.brandService
      .query()
      .pipe(
        filter((res: HttpResponse<IBrand[]>) => res.ok),
        map((res: HttpResponse<IBrand[]>) => res.body)
      )
      .subscribe(
        (res: IBrand[]) => {
          this.brands = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBrands();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBrand) {
    return item.id;
  }

  registerChangeInBrands() {
    this.eventSubscriber = this.eventManager.subscribe('brandListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
