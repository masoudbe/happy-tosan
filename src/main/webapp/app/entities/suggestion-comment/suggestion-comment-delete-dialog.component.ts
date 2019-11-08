import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISuggestionComment } from 'app/shared/model/suggestion-comment.model';
import { SuggestionCommentService } from './suggestion-comment.service';

@Component({
  selector: 'jhi-suggestion-comment-delete-dialog',
  templateUrl: './suggestion-comment-delete-dialog.component.html'
})
export class SuggestionCommentDeleteDialogComponent {
  suggestionComment: ISuggestionComment;

  constructor(
    protected suggestionCommentService: SuggestionCommentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.suggestionCommentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'suggestionCommentListModification',
        content: 'Deleted an suggestionComment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-suggestion-comment-delete-popup',
  template: ''
})
export class SuggestionCommentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ suggestionComment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SuggestionCommentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.suggestionComment = suggestionComment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/suggestion-comment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/suggestion-comment', { outlets: { popup: null } }]);
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
