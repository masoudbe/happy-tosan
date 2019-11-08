import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISuggestion } from 'app/shared/model/suggestion.model';

@Component({
  selector: 'jhi-suggestion-detail',
  templateUrl: './suggestion-detail.component.html'
})
export class SuggestionDetailComponent implements OnInit {
  suggestion: ISuggestion;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ suggestion }) => {
      this.suggestion = suggestion;
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
