import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISuggestion } from 'app/shared/model/suggestion.model';
import { SuggestionService } from './suggestion.service';

@Component({
  selector: 'jhi-suggestion-delete-dialog',
  templateUrl: './suggestion-delete-dialog.component.html'
})
export class SuggestionDeleteDialogComponent {
  suggestion: ISuggestion;

  constructor(
    protected suggestionService: SuggestionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.suggestionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'suggestionListModification',
        content: 'Deleted an suggestion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-suggestion-delete-popup',
  template: ''
})
export class SuggestionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ suggestion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SuggestionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.suggestion = suggestion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/suggestion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/suggestion', { outlets: { popup: null } }]);
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
