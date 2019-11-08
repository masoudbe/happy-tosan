import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemSuggestionAccept } from 'app/shared/model/system-suggestion-accept.model';
import { SystemSuggestionAcceptService } from './system-suggestion-accept.service';

@Component({
  selector: 'jhi-system-suggestion-accept-delete-dialog',
  templateUrl: './system-suggestion-accept-delete-dialog.component.html'
})
export class SystemSuggestionAcceptDeleteDialogComponent {
  systemSuggestionAccept: ISystemSuggestionAccept;

  constructor(
    protected systemSuggestionAcceptService: SystemSuggestionAcceptService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.systemSuggestionAcceptService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'systemSuggestionAcceptListModification',
        content: 'Deleted an systemSuggestionAccept'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-system-suggestion-accept-delete-popup',
  template: ''
})
export class SystemSuggestionAcceptDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestionAccept }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SystemSuggestionAcceptDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.systemSuggestionAccept = systemSuggestionAccept;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/system-suggestion-accept', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/system-suggestion-accept', { outlets: { popup: null } }]);
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
