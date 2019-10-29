import { IUser } from 'app/core/user/user.model';

export interface IUserLevel {
  id?: number;
  level?: number;
  mainUser?: IUser;
  user?: IUser;
}

export class UserLevel implements IUserLevel {
  constructor(public id?: number, public level?: number, public mainUser?: IUser, public user?: IUser) {}
}
