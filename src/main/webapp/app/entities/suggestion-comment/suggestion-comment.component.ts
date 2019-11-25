import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import {ISuggestionComment, SuggestionComment} from 'app/shared/model/suggestion-comment.model';
import { AccountService } from 'app/core';
import { SuggestionCommentService } from './suggestion-comment.service';
import {TrackerMsgService} from "app/core/msgtracker/trackermsg.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'jhi-suggestion-comment',
  templateUrl: './suggestion-comment.component.html'
})
export class SuggestionCommentComponent implements OnInit, OnDestroy {
  suggestionComments: ISuggestionComment[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected suggestionCommentService: SuggestionCommentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected msgService: TrackerMsgService,
    private route: ActivatedRoute
  ) {
    this.msgService.connect();
  }

  loadAll() {
    this.route.url.subscribe()
    if(this.route.url.value.length == 2){
      const id = this.route.url.value[0].path;
      const suggestion = this.route.url.value[1].path;
      if(suggestion == 'suggestionView') {
        this.suggestionCommentService
          .findBy(id, "suggestion")
          .pipe(
            filter((res: HttpResponse<ISuggestionComment[]>) => res.ok),
            map((res: HttpResponse<ISuggestionComment[]>) => res.body)
          )
          .subscribe(
            (res: ISuggestionComment[]) => {
              this.suggestionComments = res;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }
    }
    else {
      this.suggestionCommentService
        .query()
        .pipe(
          filter((res: HttpResponse<ISuggestionComment[]>) => res.ok),
          map((res: HttpResponse<ISuggestionComment[]>) => res.body)
        )
        .subscribe(
          (res: ISuggestionComment[]) => {
            this.suggestionComments = res;
          },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSuggestionComments();

    this.msgService.subscribe();
    this.msgService.receive().subscribe(activity => {
      this.loadAll();
    });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISuggestionComment) {
    return item.id;
  }

  registerChangeInSuggestionComments() {
    this.eventSubscriber = this.eventManager.subscribe('suggestionCommentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
