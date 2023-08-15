import { EmployeeTitle } from './EmployeeTitle.enum';
import { ILicenseData } from './ILicenseData';
import { IMetaData } from './IMetaData';

export interface IEmployeeData extends IMetaData {
  title?: EmployeeTitle;
  licenses?: ILicenseData[];
}
