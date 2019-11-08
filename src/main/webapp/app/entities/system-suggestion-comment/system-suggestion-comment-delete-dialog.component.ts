import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemSuggestionComment } from 'app/shared/model/system-suggestion-comment.model';
import { SystemSuggestionCommentService } from './system-suggestion-comment.service';

@Component({
  selector: 'jhi-system-suggestion-comment-delete-dialog',
  templateUrl: './system-suggestion-comment-delete-dialog.component.html'
})
export class SystemSuggestionCommentDeleteDialogComponent {
  systemSuggestionComment: ISystemSuggestionComment;

  constructor(
    protected systemSuggestionCommentService: SystemSuggestionCommentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.systemSuggestionCommentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'systemSuggestionCommentListModification',
        content: 'Deleted an systemSuggestionComment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-system-suggestion-comment-delete-popup',
  template: ''
})
export class SystemSuggestionCommentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestionComment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SystemSuggestionCommentDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.systemSuggestionComment = systemSuggestionComment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/system-suggestion-comment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/system-suggestion-comment', { outlets: { popup: null } }]);
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
