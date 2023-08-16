import { Request, Response } from 'express';
import { businessService } from '../services/business';
import { businessPatch } from '../handleMetadata';

const getDeepAll = async (req: Request, res: Response) => {
	try {
		const businessesWithEmployeesAndLicenses = await businessService.getDeepAll();

		res.status(200).json(businessesWithEmployeesAndLicenses);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const updateMany = async (req: Request, res: Response) => {
	try {
		businessPatch(req, res);

		res.sendStatus(200);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
}

export const businessController = {
	getDeepAll,
	updateMany,
}
