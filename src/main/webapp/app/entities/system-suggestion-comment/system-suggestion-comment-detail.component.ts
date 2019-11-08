import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISystemSuggestionComment } from 'app/shared/model/system-suggestion-comment.model';

@Component({
  selector: 'jhi-system-suggestion-comment-detail',
  templateUrl: './system-suggestion-comment-detail.component.html'
})
export class SystemSuggestionCommentDetailComponent implements OnInit {
  systemSuggestionComment: ISystemSuggestionComment;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestionComment }) => {
      this.systemSuggestionComment = systemSuggestionComment;
    });
  }

  previousState() {
    window.history.back();
  }
}
