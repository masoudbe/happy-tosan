import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  SuggestionCommentComponent,
  SuggestionCommentDetailComponent,
  SuggestionCommentUpdateComponent,
  SuggestionCommentDeletePopupComponent,
  SuggestionCommentDeleteDialogComponent,
  suggestionCommentRoute,
  suggestionCommentPopupRoute
} from './';

const ENTITY_STATES = [...suggestionCommentRoute, ...suggestionCommentPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SuggestionCommentComponent,
    SuggestionCommentDetailComponent,
    SuggestionCommentUpdateComponent,
    SuggestionCommentDeleteDialogComponent,
    SuggestionCommentDeletePopupComponent
  ],
  entryComponents: [
    SuggestionCommentComponent,
    SuggestionCommentUpdateComponent,
    SuggestionCommentDeleteDialogComponent,
    SuggestionCommentDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSuggestionCommentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
