import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISuggestionComment, SuggestionComment } from 'app/shared/model/suggestion-comment.model';
import { SuggestionCommentService } from './suggestion-comment.service';
import { ISuggestion } from 'app/shared/model/suggestion.model';
import { SuggestionService } from 'app/entities/suggestion';
import {TrackerMsgService} from "app/core/msgtracker/trackermsg.service";

@Component({
  selector: 'jhi-suggestion-comment-update',
  templateUrl: './suggestion-comment-update.component.html'
})
export class SuggestionCommentUpdateComponent implements OnInit {
  isSaving: boolean;
  suggestions: ISuggestion[];
  suggestionId: number;

  editForm = this.fb.group({
    id: [],
    comment: [],
    suggestion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected suggestionCommentService: SuggestionCommentService,
    protected suggestionService: SuggestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected msgService: TrackerMsgService,
    private router: Router
  ) {
    this.msgService.connect();
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ suggestionComment }) => {
      this.updateForm(suggestionComment);
    });

    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    const c = this.activatedRoute.params['suggestionId'];
    this.suggestionId = +s[2].path;

    this.suggestionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISuggestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISuggestion[]>) => response.body)
      )
      .subscribe((res: ISuggestion[]) => (this.suggestions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(suggestionComment: ISuggestionComment) {
    this.editForm.patchValue({
      id: suggestionComment.id,
      comment: suggestionComment.comment,
      suggestion: suggestionComment.suggestion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const suggestionComment = this.createFromForm();
    if (suggestionComment.id !== undefined) {
      this.subscribeToSaveResponse(this.suggestionCommentService.update(suggestionComment));
    } else {
      suggestionComment.suggestion = this.suggestions.find(p => p.id == this.suggestionId)
      this.subscribeToSaveResponse(this.suggestionCommentService.create(suggestionComment));
    }
  }

  private createFromForm(): ISuggestionComment {
    return {
      ...new SuggestionComment(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      suggestion: this.editForm.get(['suggestion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuggestionComment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
    this.sendMessage();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackSuggestionById(index: number, item: ISuggestion) {
    return item.id;
  }

  sendMessage(){
    this.msgService.sendActivity();
  }
}
