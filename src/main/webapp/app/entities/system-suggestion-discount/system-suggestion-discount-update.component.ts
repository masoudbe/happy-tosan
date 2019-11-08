import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISystemSuggestionDiscount, SystemSuggestionDiscount } from 'app/shared/model/system-suggestion-discount.model';
import { SystemSuggestionDiscountService } from './system-suggestion-discount.service';
import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';
import { SystemSuggestionService } from 'app/entities/system-suggestion';

@Component({
  selector: 'jhi-system-suggestion-discount-update',
  templateUrl: './system-suggestion-discount-update.component.html'
})
export class SystemSuggestionDiscountUpdateComponent implements OnInit {
  isSaving: boolean;

  systemsuggestions: ISystemSuggestion[];
  startDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    comment: [],
    startDate: [],
    endDate: [],
    discountPercent: [],
    acceptCount: [],
    suggestion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected systemSuggestionDiscountService: SystemSuggestionDiscountService,
    protected systemSuggestionService: SystemSuggestionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ systemSuggestionDiscount }) => {
      this.updateForm(systemSuggestionDiscount);
    });
    this.systemSuggestionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISystemSuggestion[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISystemSuggestion[]>) => response.body)
      )
      .subscribe((res: ISystemSuggestion[]) => (this.systemsuggestions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(systemSuggestionDiscount: ISystemSuggestionDiscount) {
    this.editForm.patchValue({
      id: systemSuggestionDiscount.id,
      comment: systemSuggestionDiscount.comment,
      startDate: systemSuggestionDiscount.startDate,
      endDate: systemSuggestionDiscount.endDate,
      discountPercent: systemSuggestionDiscount.discountPercent,
      acceptCount: systemSuggestionDiscount.acceptCount,
      suggestion: systemSuggestionDiscount.suggestion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const systemSuggestionDiscount = this.createFromForm();
    if (systemSuggestionDiscount.id !== undefined) {
      this.subscribeToSaveResponse(this.systemSuggestionDiscountService.update(systemSuggestionDiscount));
    } else {
      this.subscribeToSaveResponse(this.systemSuggestionDiscountService.create(systemSuggestionDiscount));
    }
  }

  private createFromForm(): ISystemSuggestionDiscount {
    return {
      ...new SystemSuggestionDiscount(),
      id: this.editForm.get(['id']).value,
      comment: this.editForm.get(['comment']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      discountPercent: this.editForm.get(['discountPercent']).value,
      acceptCount: this.editForm.get(['acceptCount']).value,
      suggestion: this.editForm.get(['suggestion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemSuggestionDiscount>>) {
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

  trackSystemSuggestionById(index: number, item: ISystemSuggestion) {
    return item.id;
  }
}
