import { Moment } from 'moment';
import { IProductType } from 'app/shared/model/product-type.model';
import { IBrand } from 'app/shared/model/brand.model';
import { IUser } from 'app/core/user/user.model';

export interface ISuggestion {
  id?: number;
  faName?: string;
  enName?: string;
  startDate?: Moment;
  endDate?: Moment;
  img1ContentType?: string;
  img1?: any;
  img2ContentType?: string;
  img2?: any;
  img3ContentType?: string;
  img3?: any;
  img4ContentType?: string;
  img4?: any;
  price?: number;
  active?: boolean;
  score?: number;
  comment?: string;
  userLevelNumber?: number;
  type?: IProductType;
  brand?: IBrand;
  user?: IUser;
}

export class Suggestion implements ISuggestion {
  constructor(
    public id?: number,
    public faName?: string,
    public enName?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public img1ContentType?: string,
    public img1?: any,
    public img2ContentType?: string,
    public img2?: any,
    public img3ContentType?: string,
    public img3?: any,
    public img4ContentType?: string,
    public img4?: any,
    public price?: number,
    public active?: boolean,
    public score?: number,
    public comment?: string,
    public userLevelNumber?: number,
    public type?: IProductType,
    public brand?: IBrand,
    public user?: IUser
  ) {
    this.active = this.active || false;
  }
}
