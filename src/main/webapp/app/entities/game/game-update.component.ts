import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IGame, Game } from 'app/shared/model/game.model';
import { GameService } from './game.service';

@Component({
  selector: 'jhi-game-update',
  templateUrl: './game-update.component.html'
})
export class GameUpdateComponent implements OnInit {
  isSaving: boolean;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    team1Name: [],
    team2Name: [],
    team1Goal: [],
    team2Goal: [],
    groupName: [],
    leagueNumber: [],
    date: []
  });

  constructor(protected gameService: GameService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ game }) => {
      this.updateForm(game);
    });
  }

  updateForm(game: IGame) {
    this.editForm.patchValue({
      id: game.id,
      team1Name: game.team1Name,
      team2Name: game.team2Name,
      team1Goal: game.team1Goal,
      team2Goal: game.team2Goal,
      groupName: game.groupName,
      leagueNumber: game.leagueNumber,
      date: game.date
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const game = this.createFromForm();
    if (game.id !== undefined) {
      this.subscribeToSaveResponse(this.gameService.update(game));
    } else {
      this.subscribeToSaveResponse(this.gameService.create(game));
    }
  }

  private createFromForm(): IGame {
    return {
      ...new Game(),
      id: this.editForm.get(['id']).value,
      team1Name: this.editForm.get(['team1Name']).value,
      team2Name: this.editForm.get(['team2Name']).value,
      team1Goal: this.editForm.get(['team1Goal']).value,
      team2Goal: this.editForm.get(['team2Goal']).value,
      groupName: this.editForm.get(['groupName']).value,
      leagueNumber: this.editForm.get(['leagueNumber']).value,
      date: this.editForm.get(['date']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGame>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
