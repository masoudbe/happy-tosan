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
