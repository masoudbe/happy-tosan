/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BettingTestModule } from '../../../test.module';
import { ChatInfoDetailComponent } from 'app/entities/chat-info/chat-info-detail.component';
import { ChatInfo } from 'app/shared/model/chat-info.model';

describe('Component Tests', () => {
  describe('ChatInfo Management Detail Component', () => {
    let comp: ChatInfoDetailComponent;
    let fixture: ComponentFixture<ChatInfoDetailComponent>;
    const route = ({ data: of({ chatInfo: new ChatInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BettingTestModule],
        declarations: [ChatInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChatInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chatInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
