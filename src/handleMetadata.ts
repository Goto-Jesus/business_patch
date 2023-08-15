import { dbInstance } from './server';
import { toArrayOfIds } from './utils/toArrayOfIds';
import { getNextId } from './utils/getNextId';

import { Transaction } from 'sequelize';
import { EmployeeTitle } from './types/EmployeeTitle.enum';

import { IBusinessData } from './types/IBusinessData';
import { IEmployeeData } from './types/IEmployeeData';
import { ILicenseData } from './types/ILicenseData';

import { licenseService } from './services/license';
import { businessService } from './services/business';
import { employeeService } from './services/employee';

async function licensesPatch(licenses: ILicenseData[], employeeId: string, t: Transaction) {
	const licensesFromDB = await licenseService.getAll();
	const ids = toArrayOfIds(licensesFromDB);

	for (const license of licenses) {
		if (license.__create) {
			const { name, issuerName } = license;

			const id = getNextId(ids);
			ids.push(Number(id));

			if (!name || !issuerName) {
				return
			}

			await licenseService.add({ id, name, issuerName, employeeId }, t);
		}

		if (license.__delete) {
			const { id } = license;

			if (!id) {
				return;
			}

			await licenseService.remove(id, t);
		}

		if (license.id) {
			const { id, name } = license;
      
			if (!name) {
				return;
			}

			await licenseService.update(id, name, t);
		}
	}
}

async function employeesPatch(employees: IEmployeeData[], businessId: string) {
	if (dbInstance) {
		dbInstance.transaction(async (t) => {
			const employeesFromDB = await employeeService.getAll();
			const ids = toArrayOfIds(employeesFromDB);

			for (const employee of employees) {
				if (employee.__create) {
					const { name, title, licenses } = employee;

					const id = getNextId(ids);
					ids.push(Number(id));

					if (!name || !title) {
						return;
					}

					await employeeService.add({ id, name, title, businessId }, t);

					if (licenses && title) {
						if (title !== EmployeeTitle.WarehouseWorker) {
							return;
						}

						await licensesPatch(licenses, id, t);
					}
				}

				if (employee.__delete) {
					const { id, licenses } = employee;

					if (!id) {
						return;
					}

					await employeeService.remove(id, t);

					if (licenses && id) {
						await licensesPatch(licenses, id, t);
					}
				}

				if (employee.__unlink) {
					const { id, licenses } = employee;

					if (!id) {
						return;
					}

					await employeeService.unlink(id, t);

					if (licenses && id) {
						await licensesPatch(licenses, id, t);
					}
				}

				if (employee.id) {
					const { id, title, licenses } = employee;

					if (title) {
						await employeeService.update(id, title, t);
					}

					if (licenses) {
						await licensesPatch(licenses, id, t);
					}
				}
			}
		});
	}
}

export async function businessPatch(business: IBusinessData) {
	if (business.__create) {
		const { name, employees } = business;

		const businessesFromDB = await businessService.getAll();
		const ids = toArrayOfIds(businessesFromDB);
		const id = getNextId(ids);

		if (!name) {
			return
		}

		await businessService.add(id, name);

		if (employees) {
			await employeesPatch(employees, id);
		}
	}

	if (business.__delete) {
		const { id, employees } = business;

		if (!id) {
			return;
		}

		await businessService.remove(id);

		if (employees && id) {
			await employeesPatch(employees, id);
		}
	}

	if (business.id) {
		const { id, name, employees } = business;

		if (name) {
			await businessService.update(id, name)
		}

		if (employees) {
			await employeesPatch(employees, id);
		}
	}
}
