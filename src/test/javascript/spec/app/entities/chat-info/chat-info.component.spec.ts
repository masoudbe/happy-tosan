/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BettingTestModule } from '../../../test.module';
import { ChatInfoComponent } from 'app/entities/chat-info/chat-info.component';
import { ChatInfoService } from 'app/entities/chat-info/chat-info.service';
import { ChatInfo } from 'app/shared/model/chat-info.model';

describe('Component Tests', () => {
  describe('ChatInfo Management Component', () => {
    let comp: ChatInfoComponent;
    let fixture: ComponentFixture<ChatInfoComponent>;
    let service: ChatInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BettingTestModule],
        declarations: [ChatInfoComponent],
        providers: []
      })
        .overrideTemplate(ChatInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ChatInfo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chatInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
