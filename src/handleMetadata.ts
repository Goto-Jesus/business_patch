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
import { Request, Response } from 'express';

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

async function employeesPatch(req: Request, res: Response, employees: IEmployeeData[], businessId: string) {
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
						res.status(400);
						res.send('You didn\'t write the name or title of the Employee');
						return;
					}

					await employeeService.add({ id, name, title, businessId }, t);

					if (licenses && title) {
						if (title !== EmployeeTitle.WarehouseWorker) {
							res.status(400);
							res.send('A license can only be specified for a warehouse worker')
							return;
						}

						await licensesPatch(licenses, id, t);
					}
				}

				if (employee.__delete) {
					const { id, licenses } = employee;

					if (!id) {
						res.status(404);
						res.send('You can\'t delete the Employee. ID not found!')
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
						res.status(404);
						res.send('You can\'t unlink the Employee. ID not found!')
						return;
					}

					await employeeService.unlink(id, t);

					if (licenses && id) {
						await licensesPatch(licenses, id, t);
					}
				}

				if (employee.id) {
					const { id, title, licenses } = employee;

					if (!title && !licenses) {
						res.status(400);
						res.send('You have not entered the data that you would like to modify for Employee');
					}

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

export async function businessPatch(req: Request, res: Response) {
	const business: IBusinessData = req.body;

	if (!business.__create && !business.__delete && !business.id) {
		res.status(400);
		res.send('You didn\'t specify any action for Business.')
	}

	if (business.__create) {
		const { name, employees } = business;

		const businessesFromDB = await businessService.getAll();
		const ids = toArrayOfIds(businessesFromDB);
		const id = getNextId(ids);

		if (!name) {
			res.status(400);
			res.send('You can\'t create a Business without a name!')
			return;
		}

		await businessService.add(id, name);

		if (employees) {
			await employeesPatch(req, res, employees, id);
		}
	}

	if (business.__delete) {
		const { id, employees } = business;

		if (!id) {
			res.status(404);
			res.send('You can\'t delete the Business. ID not found!')
			return;
		}

		await businessService.remove(id);

		if (employees && id) {
			await employeesPatch(req, res, employees, id);
		}
	}

	if (business.id) {
		const { id, name, employees } = business;

		if (!name && !employees) {
			res.status(400);
			res.send('You have not entered the data that you would like to modify for Business');
		}

		if (name) {
			await businessService.update(id, name)
		}

		if (employees) {
			await employeesPatch(req, res, employees, id);
		}
	}
}
