import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISystemSuggestionComment, SystemSuggestionComment } from 'app/shared/model/system-suggestion-comment.model';
import { SystemSuggestionCommentService } from './system-suggestion-comment.service';
import { IUser, UserService } from 'app/core';
import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';
import { SystemSuggestionService } from 'app/entities/system-suggestion';

@Component({
  selector: 'jhi-system-suggestion-comment-update',
  templateUrl: './system-suggestion-comment-update.component.html'
})
export class SystemSuggestionCommentUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  systemsuggestions: ISystemSuggestion[];
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
    protected systemSuggestionCommentService: SystemSuggestionCommentService,
    protected userService: UserService,
    protected systemSuggestionService: SystemSuggestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ systemSuggestionComment }) => {
      this.updateForm(systemSuggestionComment);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.systemSuggestionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISystemSuggestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISystemSuggestion[]>) => response.body)
      )
      .subscribe((res: ISystemSuggestion[]) => (this.systemsuggestions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(systemSuggestionComment: ISystemSuggestionComment) {
    this.editForm.patchValue({
      id: systemSuggestionComment.id,
      comment: systemSuggestionComment.comment,
      date: systemSuggestionComment.date,
      user: systemSuggestionComment.user,
      suggestion: systemSuggestionComment.suggestion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const systemSuggestionComment = this.createFromForm();
    if (systemSuggestionComment.id !== undefined) {
      this.subscribeToSaveResponse(this.systemSuggestionCommentService.update(systemSuggestionComment));
    } else {
      this.subscribeToSaveResponse(this.systemSuggestionCommentService.create(systemSuggestionComment));
    }
  }

  private createFromForm(): ISystemSuggestionComment {
    return {
      ...new SystemSuggestionComment(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      date: this.editForm.get(['date']).value,
      user: this.editForm.get(['user']).value,
      suggestion: this.editForm.get(['suggestion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemSuggestionComment>>) {
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

  trackSystemSuggestionById(index: number, item: ISystemSuggestion) {
    return item.id;
  }
}
