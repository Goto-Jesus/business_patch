import { EmployeeTitle } from './EmployeeTitle.enum';
import { ILicense } from './ILicense';

export interface IEmployee {
  id: string;
  name: string;
  title: EmployeeTitle;
  licenses?: ILicense[];
  businessId: string;
}
