import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IChatInfo } from 'app/shared/model/chat-info.model';

@Component({
  selector: 'jhi-chat-info-detail',
  templateUrl: './chat-info-detail.component.html'
})
export class ChatInfoDetailComponent implements OnInit {
  chatInfo: IChatInfo;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chatInfo }) => {
      this.chatInfo = chatInfo;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
