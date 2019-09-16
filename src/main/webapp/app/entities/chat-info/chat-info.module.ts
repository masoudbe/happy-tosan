import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  ChatInfoComponent,
  ChatInfoDetailComponent,
  ChatInfoUpdateComponent,
  ChatInfoDeletePopupComponent,
  ChatInfoDeleteDialogComponent,
  chatInfoRoute,
  chatInfoPopupRoute
} from './';

const ENTITY_STATES = [...chatInfoRoute, ...chatInfoPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ChatInfoComponent,
    ChatInfoDetailComponent,
    ChatInfoUpdateComponent,
    ChatInfoDeleteDialogComponent,
    ChatInfoDeletePopupComponent
  ],
  entryComponents: [ChatInfoComponent, ChatInfoUpdateComponent, ChatInfoDeleteDialogComponent, ChatInfoDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingChatInfoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
