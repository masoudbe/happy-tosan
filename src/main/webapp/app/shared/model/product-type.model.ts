import { IProductType } from 'app/shared/model/product-type.model';

export interface IProductType {
  id?: number;
  code?: string;
  enName?: string;
  faName?: string;
  parentType?: IProductType;
}

export class ProductType implements IProductType {
  constructor(public id?: number, public code?: string, public enName?: string, public faName?: string, public parentType?: IProductType) {}
}
