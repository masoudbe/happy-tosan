import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProductType, ProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from './product-type.service';

@Component({
  selector: 'jhi-product-type-update',
  templateUrl: './product-type-update.component.html'
})
export class ProductTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  producttypes: IProductType[];

  editForm = this.fb.group({
    id: [],
    code: [],
    enName: [],
    faName: [],
    parentType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productTypeService: ProductTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ productType }) => {
      this.updateForm(productType);
    });
    this.productTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductType[]>) => response.body)
      )
      .subscribe((res: IProductType[]) => (this.producttypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(productType: IProductType) {
    this.editForm.patchValue({
      id: productType.id,
      code: productType.code,
      enName: productType.enName,
      faName: productType.faName,
      parentType: productType.parentType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const productType = this.createFromForm();
    if (productType.id !== undefined) {
      this.subscribeToSaveResponse(this.productTypeService.update(productType));
    } else {
      this.subscribeToSaveResponse(this.productTypeService.create(productType));
    }
  }

  private createFromForm(): IProductType {
    return {
      ...new ProductType(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      enName: this.editForm.get(['enName']).value,
      faName: this.editForm.get(['faName']).value,
      parentType: this.editForm.get(['parentType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductType>>) {
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

  trackProductTypeById(index: number, item: IProductType) {
    return item.id;
  }
}
