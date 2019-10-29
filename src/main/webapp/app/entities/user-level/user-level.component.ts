import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserLevel } from 'app/shared/model/user-level.model';
import { AccountService } from 'app/core';
import { UserLevelService } from './user-level.service';

@Component({
  selector: 'jhi-user-level',
  templateUrl: './user-level.component.html'
})
export class UserLevelComponent implements OnInit, OnDestroy {
  userLevels: IUserLevel[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected userLevelService: UserLevelService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.userLevelService
      .query()
      .pipe(
        filter((res: HttpResponse<IUserLevel[]>) => res.ok),
        map((res: HttpResponse<IUserLevel[]>) => res.body)
      )
      .subscribe(
        (res: IUserLevel[]) => {
          this.userLevels = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInUserLevels();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserLevel) {
    return item.id;
  }

  registerChangeInUserLevels() {
    this.eventSubscriber = this.eventManager.subscribe('userLevelListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
