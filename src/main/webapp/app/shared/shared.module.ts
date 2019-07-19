import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BettingSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BettingSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BettingSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingSharedModule {
  static forRoot() {
    return {
      ngModule: BettingSharedModule
    };
  }
}
