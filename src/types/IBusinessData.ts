import { IMetaData } from './IMetaData';
import { IEmployeeData } from './IEmployeeData';

export interface IBusinessData extends IMetaData {
  employees?: IEmployeeData[];
}