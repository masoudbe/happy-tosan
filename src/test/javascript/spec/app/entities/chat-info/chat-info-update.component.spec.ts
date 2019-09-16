/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BettingTestModule } from '../../../test.module';
import { ChatInfoUpdateComponent } from 'app/entities/chat-info/chat-info-update.component';
import { ChatInfoService } from 'app/entities/chat-info/chat-info.service';
import { ChatInfo } from 'app/shared/model/chat-info.model';

describe('Component Tests', () => {
  describe('ChatInfo Management Update Component', () => {
    let comp: ChatInfoUpdateComponent;
    let fixture: ComponentFixture<ChatInfoUpdateComponent>;
    let service: ChatInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BettingTestModule],
        declarations: [ChatInfoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChatInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChatInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChatInfoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChatInfo(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ChatInfo();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
