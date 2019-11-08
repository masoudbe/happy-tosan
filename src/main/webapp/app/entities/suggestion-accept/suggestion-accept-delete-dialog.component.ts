import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISuggestionAccept } from 'app/shared/model/suggestion-accept.model';
import { SuggestionAcceptService } from './suggestion-accept.service';

@Component({
  selector: 'jhi-suggestion-accept-delete-dialog',
  templateUrl: './suggestion-accept-delete-dialog.component.html'
})
export class SuggestionAcceptDeleteDialogComponent {
  suggestionAccept: ISuggestionAccept;

  constructor(
    protected suggestionAcceptService: SuggestionAcceptService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.suggestionAcceptService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'suggestionAcceptListModification',
        content: 'Deleted an suggestionAccept'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-suggestion-accept-delete-popup',
  template: ''
})
export class SuggestionAcceptDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ suggestionAccept }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SuggestionAcceptDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.suggestionAccept = suggestionAccept;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/suggestion-accept', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/suggestion-accept', { outlets: { popup: null } }]);
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
