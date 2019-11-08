import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISystemSuggestionDiscount } from 'app/shared/model/system-suggestion-discount.model';

@Component({
  selector: 'jhi-system-suggestion-discount-detail',
  templateUrl: './system-suggestion-discount-detail.component.html'
})
export class SystemSuggestionDiscountDetailComponent implements OnInit {
  systemSuggestionDiscount: ISystemSuggestionDiscount;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ systemSuggestionDiscount }) => {
      this.systemSuggestionDiscount = systemSuggestionDiscount;
    });
  }

  previousState() {
    window.history.back();
  }
}
