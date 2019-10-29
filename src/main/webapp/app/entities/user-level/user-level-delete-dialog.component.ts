import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserLevel } from 'app/shared/model/user-level.model';
import { UserLevelService } from './user-level.service';

@Component({
  selector: 'jhi-user-level-delete-dialog',
  templateUrl: './user-level-delete-dialog.component.html'
})
export class UserLevelDeleteDialogComponent {
  userLevel: IUserLevel;

  constructor(protected userLevelService: UserLevelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userLevelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'userLevelListModification',
        content: 'Deleted an userLevel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-user-level-delete-popup',
  template: ''
})
export class UserLevelDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userLevel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UserLevelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.userLevel = userLevel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/user-level', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/user-level', { outlets: { popup: null } }]);
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
