import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISuggestionAccept, SuggestionAccept } from 'app/shared/model/suggestion-accept.model';
import { SuggestionAcceptService } from './suggestion-accept.service';
import { IUser, UserService } from 'app/core';
import { ISuggestion } from 'app/shared/model/suggestion.model';
import { SuggestionService } from 'app/entities/suggestion';

@Component({
  selector: 'jhi-suggestion-accept-update',
  templateUrl: './suggestion-accept-update.component.html'
})
export class SuggestionAcceptUpdateComponent implements OnInit {
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
    protected suggestionAcceptService: SuggestionAcceptService,
    protected userService: UserService,
    protected suggestionService: SuggestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ suggestionAccept }) => {
      this.updateForm(suggestionAccept);
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

  updateForm(suggestionAccept: ISuggestionAccept) {
    this.editForm.patchValue({
      id: suggestionAccept.id,
      comment: suggestionAccept.comment,
      date: suggestionAccept.date,
      user: suggestionAccept.user,
      suggestion: suggestionAccept.suggestion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const suggestionAccept = this.createFromForm();
    if (suggestionAccept.id !== undefined) {
      this.subscribeToSaveResponse(this.suggestionAcceptService.update(suggestionAccept));
    } else {
      this.subscribeToSaveResponse(this.suggestionAcceptService.create(suggestionAccept));
    }
  }

  private createFromForm(): ISuggestionAccept {
    return {
      ...new SuggestionAccept(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      date: this.editForm.get(['date']).value,
      user: this.editForm.get(['user']).value,
      suggestion: this.editForm.get(['suggestion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuggestionAccept>>) {
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
