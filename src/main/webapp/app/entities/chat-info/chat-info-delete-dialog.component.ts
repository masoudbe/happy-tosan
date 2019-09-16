import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChatInfo } from 'app/shared/model/chat-info.model';
import { ChatInfoService } from './chat-info.service';

@Component({
  selector: 'jhi-chat-info-delete-dialog',
  templateUrl: './chat-info-delete-dialog.component.html'
})
export class ChatInfoDeleteDialogComponent {
  chatInfo: IChatInfo;

  constructor(protected chatInfoService: ChatInfoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.chatInfoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'chatInfoListModification',
        content: 'Deleted an chatInfo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-chat-info-delete-popup',
  template: ''
})
export class ChatInfoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chatInfo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ChatInfoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.chatInfo = chatInfo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/chat-info', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/chat-info', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
