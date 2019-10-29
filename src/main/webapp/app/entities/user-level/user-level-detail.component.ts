import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserLevel } from 'app/shared/model/user-level.model';

@Component({
  selector: 'jhi-user-level-detail',
  templateUrl: './user-level-detail.component.html'
})
export class UserLevelDetailComponent implements OnInit {
  userLevel: IUserLevel;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ userLevel }) => {
      this.userLevel = userLevel;
    });
  }

  previousState() {
    window.history.back();
  }
}
