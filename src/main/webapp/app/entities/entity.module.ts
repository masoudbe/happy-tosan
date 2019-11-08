import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'chat-info',
        loadChildren: './chat-info/chat-info.module#BettingChatInfoModule'
      },
      {
        path: 'game',
        loadChildren: './game/game.module#BettingGameModule'
      },
      {
        path: 'player',
        loadChildren: './player/player.module#BettingPlayerModule'
      },
      {
        path: 'user-level',
        loadChildren: './user-level/user-level.module#BettingUserLevelModule'
      },
      {
        path: 'product-type',
        loadChildren: './product-type/product-type.module#BettingProductTypeModule'
      },
      {
        path: 'brand',
        loadChildren: './brand/brand.module#BettingBrandModule'
      },
      {
        path: 'suggestion',
        loadChildren: './suggestion/suggestion.module#BettingSuggestionModule'
      },
      {
        path: 'system-suggestion',
        loadChildren: './system-suggestion/system-suggestion.module#BettingSystemSuggestionModule'
      },
      {
        path: 'suggestion-comment',
        loadChildren: './suggestion-comment/suggestion-comment.module#BettingSuggestionCommentModule'
      },
      {
        path: 'system-suggestion-comment',
        loadChildren: './system-suggestion-comment/system-suggestion-comment.module#BettingSystemSuggestionCommentModule'
      },
      {
        path: 'suggestion-accept',
        loadChildren: './suggestion-accept/suggestion-accept.module#BettingSuggestionAcceptModule'
      },
      {
        path: 'system-suggestion-accept',
        loadChildren: './system-suggestion-accept/system-suggestion-accept.module#BettingSystemSuggestionAcceptModule'
      },
      {
        path: 'system-suggestion-discount',
        loadChildren: './system-suggestion-discount/system-suggestion-discount.module#BettingSystemSuggestionDiscountModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BettingEntityModule {}
