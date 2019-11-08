import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';
import { SystemSuggestionService } from './system-suggestion.service';

@Component({
  selector: 'jhi-system-suggestion-delete-dialog',
  templateUrl: './system-suggestion-delete-dialog.component.html'
})
export class SystemSuggestionDeleteDialogComponent {
  systemSuggestion: ISystemSuggestion;

  constructor(
    protected systemSuggestionService: SystemSuggestionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.systemSuggestionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'systemSuggestionListModification',
        content: 'Deleted an systemSuggestion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-system-suggestion-delete-popup',
  template: ''
})
export class SystemSuggestionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SystemSuggestionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.systemSuggestion = systemSuggestion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/system-suggestion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/system-suggestion', { outlets: { popup: null } }]);
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
