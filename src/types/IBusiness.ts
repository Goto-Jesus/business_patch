import { IEmployee } from './IEmployee';

export interface IBusiness {
  id: string;
  name: string;
  employees: IEmployee[];
}
