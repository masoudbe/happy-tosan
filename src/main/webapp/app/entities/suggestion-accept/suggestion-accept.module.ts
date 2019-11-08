import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  SuggestionAcceptComponent,
  SuggestionAcceptDetailComponent,
  SuggestionAcceptUpdateComponent,
  SuggestionAcceptDeletePopupComponent,
  SuggestionAcceptDeleteDialogComponent,
  suggestionAcceptRoute,
  suggestionAcceptPopupRoute
} from './';

const ENTITY_STATES = [...suggestionAcceptRoute, ...suggestionAcceptPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SuggestionAcceptComponent,
    SuggestionAcceptDetailComponent,
    SuggestionAcceptUpdateComponent,
    SuggestionAcceptDeleteDialogComponent,
    SuggestionAcceptDeletePopupComponent
  ],
  entryComponents: [
    SuggestionAcceptComponent,
    SuggestionAcceptUpdateComponent,
    SuggestionAcceptDeleteDialogComponent,
    SuggestionAcceptDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSuggestionAcceptModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
