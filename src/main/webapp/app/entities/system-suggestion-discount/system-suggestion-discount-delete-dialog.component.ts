import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemSuggestionDiscount } from 'app/shared/model/system-suggestion-discount.model';
import { SystemSuggestionDiscountService } from './system-suggestion-discount.service';

@Component({
  selector: 'jhi-system-suggestion-discount-delete-dialog',
  templateUrl: './system-suggestion-discount-delete-dialog.component.html'
})
export class SystemSuggestionDiscountDeleteDialogComponent {
  systemSuggestionDiscount: ISystemSuggestionDiscount;

  constructor(
    protected systemSuggestionDiscountService: SystemSuggestionDiscountService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.systemSuggestionDiscountService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'systemSuggestionDiscountListModification',
        content: 'Deleted an systemSuggestionDiscount'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-system-suggestion-discount-delete-popup',
  template: ''
})
export class SystemSuggestionDiscountDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestionDiscount }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SystemSuggestionDiscountDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.systemSuggestionDiscount = systemSuggestionDiscount;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/system-suggestion-discount', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/system-suggestion-discount', { outlets: { popup: null } }]);
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
