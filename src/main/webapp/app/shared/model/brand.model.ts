export interface IBrand {
  id?: number;
  code?: string;
  enName?: string;
  faName?: string;
}

export class Brand implements IBrand {
  constructor(public id?: number, public code?: string, public enName?: string, public faName?: string) {}
}
