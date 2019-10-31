import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBrand } from 'app/shared/model/brand.model';
import { BrandService } from './brand.service';

@Component({
  selector: 'jhi-brand-delete-dialog',
  templateUrl: './brand-delete-dialog.component.html'
})
export class BrandDeleteDialogComponent {
  brand: IBrand;

  constructor(protected brandService: BrandService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.brandService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'brandListModification',
        content: 'Deleted an brand'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-brand-delete-popup',
  template: ''
})
export class BrandDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ brand }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BrandDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.brand = brand;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/brand', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/brand', { outlets: { popup: null } }]);
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
