import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IChatInfo, ChatInfo } from 'app/shared/model/chat-info.model';
import { ChatInfoService } from './chat-info.service';
import {TrackerMsgService} from 'app/core/msgtracker/trackermsg.service';

@Component({
  selector: 'jhi-chat-info-update',
  templateUrl: './chat-info-update.component.html'
})
export class ChatInfoUpdateComponent implements OnInit {
  isSaving: boolean;
  sentDateDp: any;

  editForm = this.fb.group({
    id: [],
    message: [],
    photo: [],
    photoContentType: [],
    acceptByAdmin: [],
    fromUser: [],
    toUser: [],
    sentDate: [],
    isDeleted: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected chatInfoService: ChatInfoService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected msgService: TrackerMsgService
  ) {
    this.msgService.connect();
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ chatInfo }) => {
      this.updateForm(chatInfo);
    });
  }

  updateForm(chatInfo: IChatInfo) {
    this.editForm.patchValue({
      id: chatInfo.id,
      message: chatInfo.message,
      photo: chatInfo.photo,
      photoContentType: chatInfo.photoContentType,
      acceptByAdmin: chatInfo.acceptByAdmin,
      fromUser: chatInfo.fromUser,
      toUser: chatInfo.toUser,
      sentDate: chatInfo.sentDate,
      isDeleted: chatInfo.isDeleted
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const chatInfo = this.createFromForm();
    if (chatInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.chatInfoService.update(chatInfo));
    } else {
      this.subscribeToSaveResponse(this.chatInfoService.create(chatInfo));
    }
  }

  private createFromForm(): IChatInfo {
    return {
      ...new ChatInfo(),
      id: this.editForm.get(['id']).value,
      message: this.editForm.get(['message']).value,
      photoContentType: this.editForm.get(['photoContentType']).value,
      photo: this.editForm.get(['photo']).value,
      acceptByAdmin: this.editForm.get(['acceptByAdmin']).value,
      fromUser: this.editForm.get(['fromUser']).value,
      toUser: this.editForm.get(['toUser']).value,
      sentDate: this.editForm.get(['sentDate']).value,
      isDeleted: this.editForm.get(['isDeleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChatInfo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.sendMessage();
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  sendMessage() {
    this.msgService.sendActivity();
  }
}
