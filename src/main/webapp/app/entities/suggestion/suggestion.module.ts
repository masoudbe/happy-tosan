import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  SuggestionComponent,
  SuggestionDetailComponent,
  SuggestionUpdateComponent,
  SuggestionDeletePopupComponent,
  SuggestionDeleteDialogComponent,
  suggestionRoute,
  suggestionPopupRoute
} from './';

const ENTITY_STATES = [...suggestionRoute, ...suggestionPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SuggestionComponent,
    SuggestionDetailComponent,
    SuggestionUpdateComponent,
    SuggestionDeleteDialogComponent,
    SuggestionDeletePopupComponent
  ],
  entryComponents: [SuggestionComponent, SuggestionUpdateComponent, SuggestionDeleteDialogComponent, SuggestionDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSuggestionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
