import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISuggestion, Suggestion } from 'app/shared/model/suggestion.model';
import { SuggestionService } from './suggestion.service';
import { IProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { IBrand } from 'app/shared/model/brand.model';
import { BrandService } from 'app/entities/brand';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-suggestion-update',
  templateUrl: './suggestion-update.component.html'
})
export class SuggestionUpdateComponent implements OnInit {
  isSaving: boolean;

  producttypes: IProductType[];

  brands: IBrand[];

  users: IUser[];
  startDateDp: any;
  endDateDp: any;

  editForm = this.fb.group({
    id: [],
    faName: [],
    enName: [],
    startDate: [],
    endDate: [],
    img1: [],
    img1ContentType: [],
    img2: [],
    img2ContentType: [],
    img3: [],
    img3ContentType: [],
    img4: [],
    img4ContentType: [],
    price: [],
    active: [],
    score: [],
    type: [],
    brand: [],
    user: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected suggestionService: SuggestionService,
    protected productTypeService: ProductTypeService,
    protected brandService: BrandService,
    protected userService: UserService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ suggestion }) => {
      this.updateForm(suggestion);
    });
    this.productTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductType[]>) => response.body)
      )
      .subscribe((res: IProductType[]) => (this.producttypes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.brandService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IBrand[]>) => mayBeOk.ok),
        map((response: HttpResponse<IBrand[]>) => response.body)
      )
      .subscribe((res: IBrand[]) => (this.brands = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(suggestion: ISuggestion) {
    this.editForm.patchValue({
      id: suggestion.id,
      faName: suggestion.faName,
      enName: suggestion.enName,
      startDate: suggestion.startDate,
      endDate: suggestion.endDate,
      img1: suggestion.img1,
      img1ContentType: suggestion.img1ContentType,
      img2: suggestion.img2,
      img2ContentType: suggestion.img2ContentType,
      img3: suggestion.img3,
      img3ContentType: suggestion.img3ContentType,
      img4: suggestion.img4,
      img4ContentType: suggestion.img4ContentType,
      price: suggestion.price,
      active: suggestion.active,
      score: suggestion.score,
      type: suggestion.type,
      brand: suggestion.brand,
      user: suggestion.user
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const suggestion = this.createFromForm();
    if (suggestion.id !== undefined) {
      this.subscribeToSaveResponse(this.suggestionService.update(suggestion));
    } else {
      this.subscribeToSaveResponse(this.suggestionService.create(suggestion));
    }
  }

  private createFromForm(): ISuggestion {
    return {
      ...new Suggestion(),
      id: this.editForm.get(['id']).value,
      faName: this.editForm.get(['faName']).value,
      enName: this.editForm.get(['enName']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      img1ContentType: this.editForm.get(['img1ContentType']).value,
      img1: this.editForm.get(['img1']).value,
      img2ContentType: this.editForm.get(['img2ContentType']).value,
      img2: this.editForm.get(['img2']).value,
      img3ContentType: this.editForm.get(['img3ContentType']).value,
      img3: this.editForm.get(['img3']).value,
      img4ContentType: this.editForm.get(['img4ContentType']).value,
      img4: this.editForm.get(['img4']).value,
      price: this.editForm.get(['price']).value,
      active: this.editForm.get(['active']).value,
      score: this.editForm.get(['score']).value,
      type: this.editForm.get(['type']).value,
      brand: this.editForm.get(['brand']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuggestion>>) {
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

  trackBrandById(index: number, item: IBrand) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
