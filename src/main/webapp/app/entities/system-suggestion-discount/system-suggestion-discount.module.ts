import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  SystemSuggestionDiscountComponent,
  SystemSuggestionDiscountDetailComponent,
  SystemSuggestionDiscountUpdateComponent,
  SystemSuggestionDiscountDeletePopupComponent,
  SystemSuggestionDiscountDeleteDialogComponent,
  systemSuggestionDiscountRoute,
  systemSuggestionDiscountPopupRoute
} from './';

const ENTITY_STATES = [...systemSuggestionDiscountRoute, ...systemSuggestionDiscountPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SystemSuggestionDiscountComponent,
    SystemSuggestionDiscountDetailComponent,
    SystemSuggestionDiscountUpdateComponent,
    SystemSuggestionDiscountDeleteDialogComponent,
    SystemSuggestionDiscountDeletePopupComponent
  ],
  entryComponents: [
    SystemSuggestionDiscountComponent,
    SystemSuggestionDiscountUpdateComponent,
    SystemSuggestionDiscountDeleteDialogComponent,
    SystemSuggestionDiscountDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSystemSuggestionDiscountModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
