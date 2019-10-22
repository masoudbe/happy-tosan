export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  code?: string;
  goalCount?: number;
  ghahremaniCount?: number;
  imgContentType?: string;
  img?: any;
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public code?: string,
    public goalCount?: number,
    public ghahremaniCount?: number,
    public imgContentType?: string,
    public img?: any
  ) {}
}
