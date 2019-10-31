import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBrand, Brand } from 'app/shared/model/brand.model';
import { BrandService } from './brand.service';

@Component({
  selector: 'jhi-brand-update',
  templateUrl: './brand-update.component.html'
})
export class BrandUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [],
    enName: [],
    faName: []
  });

  constructor(protected brandService: BrandService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ brand }) => {
      this.updateForm(brand);
    });
  }

  updateForm(brand: IBrand) {
    this.editForm.patchValue({
      id: brand.id,
      code: brand.code,
      enName: brand.enName,
      faName: brand.faName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const brand = this.createFromForm();
    if (brand.id !== undefined) {
      this.subscribeToSaveResponse(this.brandService.update(brand));
    } else {
      this.subscribeToSaveResponse(this.brandService.create(brand));
    }
  }

  private createFromForm(): IBrand {
    return {
      ...new Brand(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      enName: this.editForm.get(['enName']).value,
      faName: this.editForm.get(['faName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBrand>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
