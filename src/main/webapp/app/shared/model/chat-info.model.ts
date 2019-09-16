import { Moment } from 'moment';

export interface IChatInfo {
  id?: number;
  message?: string;
  photoContentType?: string;
  photo?: any;
  acceptByAdmin?: boolean;
  fromUser?: string;
  toUser?: string;
  sentDate?: Moment;
  isDeleted?: boolean;
}

export class ChatInfo implements IChatInfo {
  constructor(
    public id?: number,
    public message?: string,
    public photoContentType?: string,
    public photo?: any,
    public acceptByAdmin?: boolean,
    public fromUser?: string,
    public toUser?: string,
    public sentDate?: Moment,
    public isDeleted?: boolean
  ) {
    this.acceptByAdmin = this.acceptByAdmin || false;
    this.isDeleted = this.isDeleted || false;
  }
}
