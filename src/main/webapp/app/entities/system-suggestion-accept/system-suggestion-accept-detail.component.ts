import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISystemSuggestionAccept } from 'app/shared/model/system-suggestion-accept.model';

@Component({
  selector: 'jhi-system-suggestion-accept-detail',
  templateUrl: './system-suggestion-accept-detail.component.html'
})
export class SystemSuggestionAcceptDetailComponent implements OnInit {
  systemSuggestionAccept: ISystemSuggestionAccept;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestionAccept }) => {
      this.systemSuggestionAccept = systemSuggestionAccept;
    });
  }

  previousState() {
    window.history.back();
  }
}
