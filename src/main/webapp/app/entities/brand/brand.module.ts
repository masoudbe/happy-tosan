import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  BrandComponent,
  BrandDetailComponent,
  BrandUpdateComponent,
  BrandDeletePopupComponent,
  BrandDeleteDialogComponent,
  brandRoute,
  brandPopupRoute
} from './';

const ENTITY_STATES = [...brandRoute, ...brandPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BrandComponent, BrandDetailComponent, BrandUpdateComponent, BrandDeleteDialogComponent, BrandDeletePopupComponent],
  entryComponents: [BrandComponent, BrandUpdateComponent, BrandDeleteDialogComponent, BrandDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingBrandModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
