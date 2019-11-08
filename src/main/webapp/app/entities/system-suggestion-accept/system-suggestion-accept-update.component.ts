import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISystemSuggestionAccept, SystemSuggestionAccept } from 'app/shared/model/system-suggestion-accept.model';
import { SystemSuggestionAcceptService } from './system-suggestion-accept.service';
import { IUser, UserService } from 'app/core';
import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';
import { SystemSuggestionService } from 'app/entities/system-suggestion';

@Component({
  selector: 'jhi-system-suggestion-accept-update',
  templateUrl: './system-suggestion-accept-update.component.html'
})
export class SystemSuggestionAcceptUpdateComponent implements OnInit {
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
    protected systemSuggestionAcceptService: SystemSuggestionAcceptService,
    protected userService: UserService,
    protected systemSuggestionService: SystemSuggestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ systemSuggestionAccept }) => {
      this.updateForm(systemSuggestionAccept);
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

  updateForm(systemSuggestionAccept: ISystemSuggestionAccept) {
    this.editForm.patchValue({
      id: systemSuggestionAccept.id,
      comment: systemSuggestionAccept.comment,
      date: systemSuggestionAccept.date,
      user: systemSuggestionAccept.user,
      suggestion: systemSuggestionAccept.suggestion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const systemSuggestionAccept = this.createFromForm();
    if (systemSuggestionAccept.id !== undefined) {
      this.subscribeToSaveResponse(this.systemSuggestionAcceptService.update(systemSuggestionAccept));
    } else {
      this.subscribeToSaveResponse(this.systemSuggestionAcceptService.create(systemSuggestionAccept));
    }
  }

  private createFromForm(): ISystemSuggestionAccept {
    return {
      ...new SystemSuggestionAccept(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      date: this.editForm.get(['date']).value,
      user: this.editForm.get(['user']).value,
      suggestion: this.editForm.get(['suggestion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemSuggestionAccept>>) {
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
