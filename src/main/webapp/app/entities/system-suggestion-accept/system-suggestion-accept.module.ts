import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  SystemSuggestionAcceptComponent,
  SystemSuggestionAcceptDetailComponent,
  SystemSuggestionAcceptUpdateComponent,
  SystemSuggestionAcceptDeletePopupComponent,
  SystemSuggestionAcceptDeleteDialogComponent,
  systemSuggestionAcceptRoute,
  systemSuggestionAcceptPopupRoute
} from './';

const ENTITY_STATES = [...systemSuggestionAcceptRoute, ...systemSuggestionAcceptPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SystemSuggestionAcceptComponent,
    SystemSuggestionAcceptDetailComponent,
    SystemSuggestionAcceptUpdateComponent,
    SystemSuggestionAcceptDeleteDialogComponent,
    SystemSuggestionAcceptDeletePopupComponent
  ],
  entryComponents: [
    SystemSuggestionAcceptComponent,
    SystemSuggestionAcceptUpdateComponent,
    SystemSuggestionAcceptDeleteDialogComponent,
    SystemSuggestionAcceptDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSystemSuggestionAcceptModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
