import { Request, Response } from 'express';
import { employeeService } from '../services/employee';

const getDeepAll = async (req: Request, res: Response) => {
	try {
		const employeesWithLicenses = await employeeService.getDeepAll();

		res.status(200).json(employeesWithLicenses);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export const employeeController = {
	getDeepAll,
}
