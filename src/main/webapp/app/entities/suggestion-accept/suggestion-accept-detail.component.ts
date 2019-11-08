import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuggestionAccept } from 'app/shared/model/suggestion-accept.model';

@Component({
  selector: 'jhi-suggestion-accept-detail',
  templateUrl: './suggestion-accept-detail.component.html'
})
export class SuggestionAcceptDetailComponent implements OnInit {
  suggestionAccept: ISuggestionAccept;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ suggestionAccept }) => {
      this.suggestionAccept = suggestionAccept;
    });
  }

  previousState() {
    window.history.back();
  }
}
