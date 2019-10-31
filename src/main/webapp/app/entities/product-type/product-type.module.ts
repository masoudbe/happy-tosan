import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  ProductTypeComponent,
  ProductTypeDetailComponent,
  ProductTypeUpdateComponent,
  ProductTypeDeletePopupComponent,
  ProductTypeDeleteDialogComponent,
  productTypeRoute,
  productTypePopupRoute
} from './';

const ENTITY_STATES = [...productTypeRoute, ...productTypePopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProductTypeComponent,
    ProductTypeDetailComponent,
    ProductTypeUpdateComponent,
    ProductTypeDeleteDialogComponent,
    ProductTypeDeletePopupComponent
  ],
  entryComponents: [ProductTypeComponent, ProductTypeUpdateComponent, ProductTypeDeleteDialogComponent, ProductTypeDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingProductTypeModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
