import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuggestionComment } from 'app/shared/model/suggestion-comment.model';

@Component({
  selector: 'jhi-suggestion-comment-detail',
  templateUrl: './suggestion-comment-detail.component.html'
})
export class SuggestionCommentDetailComponent implements OnInit {
  suggestionComment: ISuggestionComment;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ suggestionComment }) => {
      this.suggestionComment = suggestionComment;
    });
  }

  previousState() {
    window.history.back();
  }
}
