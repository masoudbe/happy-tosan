import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  SystemSuggestionCommentComponent,
  SystemSuggestionCommentDetailComponent,
  SystemSuggestionCommentUpdateComponent,
  SystemSuggestionCommentDeletePopupComponent,
  SystemSuggestionCommentDeleteDialogComponent,
  systemSuggestionCommentRoute,
  systemSuggestionCommentPopupRoute
} from './';

const ENTITY_STATES = [...systemSuggestionCommentRoute, ...systemSuggestionCommentPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SystemSuggestionCommentComponent,
    SystemSuggestionCommentDetailComponent,
    SystemSuggestionCommentUpdateComponent,
    SystemSuggestionCommentDeleteDialogComponent,
    SystemSuggestionCommentDeletePopupComponent
  ],
  entryComponents: [
    SystemSuggestionCommentComponent,
    SystemSuggestionCommentUpdateComponent,
    SystemSuggestionCommentDeleteDialogComponent,
    SystemSuggestionCommentDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSystemSuggestionCommentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
