import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BettingSharedModule } from 'app/shared';
import {
  UserLevelComponent,
  UserLevelDetailComponent,
  UserLevelUpdateComponent,
  UserLevelDeletePopupComponent,
  UserLevelDeleteDialogComponent,
  userLevelRoute,
  userLevelPopupRoute
} from './';

const ENTITY_STATES = [...userLevelRoute, ...userLevelPopupRoute];

@NgModule({
  imports: [BettingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserLevelComponent,
    UserLevelDetailComponent,
    UserLevelUpdateComponent,
    UserLevelDeleteDialogComponent,
    UserLevelDeletePopupComponent
  ],
  entryComponents: [UserLevelComponent, UserLevelUpdateComponent, UserLevelDeleteDialogComponent, UserLevelDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingUserLevelModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
