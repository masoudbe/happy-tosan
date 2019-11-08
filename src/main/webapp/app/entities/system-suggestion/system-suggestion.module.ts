import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  SystemSuggestionComponent,
  SystemSuggestionDetailComponent,
  SystemSuggestionUpdateComponent,
  SystemSuggestionDeletePopupComponent,
  SystemSuggestionDeleteDialogComponent,
  systemSuggestionRoute,
  systemSuggestionPopupRoute
} from './';

const ENTITY_STATES = [...systemSuggestionRoute, ...systemSuggestionPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SystemSuggestionComponent,
    SystemSuggestionDetailComponent,
    SystemSuggestionUpdateComponent,
    SystemSuggestionDeleteDialogComponent,
    SystemSuggestionDeletePopupComponent
  ],
  entryComponents: [
    SystemSuggestionComponent,
    SystemSuggestionUpdateComponent,
    SystemSuggestionDeleteDialogComponent,
    SystemSuggestionDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSystemSuggestionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
