import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserLevel, UserLevel } from 'app/shared/model/user-level.model';
import { UserLevelService } from './user-level.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-user-level-update',
  templateUrl: './user-level-update.component.html'
})
export class UserLevelUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    level: [],
    mainUser: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected userLevelService: UserLevelService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ userLevel }) => {
      this.updateForm(userLevel);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(userLevel: IUserLevel) {
    this.editForm.patchValue({
      id: userLevel.id,
      level: userLevel.level,
      mainUser: userLevel.mainUser,
      user: userLevel.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const userLevel = this.createFromForm();
    if (userLevel.id !== undefined) {
      this.subscribeToSaveResponse(this.userLevelService.update(userLevel));
    } else {
      this.subscribeToSaveResponse(this.userLevelService.create(userLevel));
    }
  }

  private createFromForm(): IUserLevel {
    return {
      ...new UserLevel(),
      id: this.editForm.get(['id']).value,
      level: this.editForm.get(['level']).value,
      mainUser: this.editForm.get(['mainUser']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserLevel>>) {
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
}
