import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISystemSuggestion } from 'app/shared/model/system-suggestion.model';

@Component({
  selector: 'jhi-system-suggestion-detail',
  templateUrl: './system-suggestion-detail.component.html'
})
export class SystemSuggestionDetailComponent implements OnInit {
  systemSuggestion: ISystemSuggestion;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestion }) => {
      this.systemSuggestion = systemSuggestion;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
