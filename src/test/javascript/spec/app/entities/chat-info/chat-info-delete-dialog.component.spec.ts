/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BettingTestModule } from '../../../test.module';
import { ChatInfoDeleteDialogComponent } from 'app/entities/chat-info/chat-info-delete-dialog.component';
import { ChatInfoService } from 'app/entities/chat-info/chat-info.service';

describe('Component Tests', () => {
  describe('ChatInfo Management Delete Component', () => {
    let comp: ChatInfoDeleteDialogComponent;
    let fixture: ComponentFixture<ChatInfoDeleteDialogComponent>;
    let service: ChatInfoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BettingTestModule],
        declarations: [ChatInfoDeleteDialogComponent]
      })
        .overrideTemplate(ChatInfoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChatInfoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatInfoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
