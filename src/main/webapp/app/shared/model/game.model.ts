import { Moment } from 'moment';

export interface IGame {
  id?: number;
  team1Name?: string;
  team2Name?: string;
  team1Goal?: number;
  team2Goal?: number;
  groupName?: string;
  leagueNumber?: number;
  date?: Moment;
}

export class Game implements IGame {
  constructor(
    public id?: number,
    public team1Name?: string,
    public team2Name?: string,
    public team1Goal?: number,
    public team2Goal?: number,
    public groupName?: string,
    public leagueNumber?: number,
    public date?: Moment
  ) {}
}
