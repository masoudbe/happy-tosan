import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISuggestionComment, SuggestionComment } from 'app/shared/model/suggestion-comment.model';
import { SuggestionCommentService } from './suggestion-comment.service';
import { IUser, UserService } from 'app/core';
import { ISuggestion } from 'app/shared/model/suggestion.model';
import { SuggestionService } from 'app/entities/suggestion';

@Component({
  selector: 'jhi-suggestion-comment-update',
  templateUrl: './suggestion-comment-update.component.html'
})
export class SuggestionCommentUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  suggestions: ISuggestion[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    comment: [],
    date: [],
    user: [],
    suggestion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected suggestionCommentService: SuggestionCommentService,
    protected userService: UserService,
    protected suggestionService: SuggestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ suggestionComment }) => {
      this.updateForm(suggestionComment);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
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
      date: suggestionComment.date,
      user: suggestionComment.user,
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
      this.subscribeToSaveResponse(this.suggestionCommentService.create(suggestionComment));
    }
  }

  private createFromForm(): ISuggestionComment {
    return {
      ...new SuggestionComment(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      date: this.editForm.get(['date']).value,
      user: this.editForm.get(['user']).value,
      suggestion: this.editForm.get(['suggestion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuggestionComment>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackSuggestionById(index: number, item: ISuggestion) {
    return item.id;
  }
}
