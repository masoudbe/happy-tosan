/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BettingTestModule } from '../../../test.module';
import { PlayerComponent } from 'app/entities/player/player.component';
import { PlayerService } from 'app/entities/player/player.service';
import { Player } from 'app/shared/model/player.model';

describe('Component Tests', () => {
  describe('Player Management Component', () => {
    let comp: PlayerComponent;
    let fixture: ComponentFixture<PlayerComponent>;
    let service: PlayerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BettingTestModule],
        declarations: [PlayerComponent],
        providers: []
      })
        .overrideTemplate(PlayerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Player(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.players[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});