import { Transaction } from 'sequelize';
import { License } from '../models/License';
import { ILicense } from '../types/ILicense';

async function getAll() {
	return License.findAll();
}

async function add({ id, name, issuerName, employeeId }: ILicense, t: Transaction) {
	return License.create(
		{ id, name, issuerName, employeeId },
		{ transaction: t }
	);
}

async function remove(id: string, t: Transaction) {
	return License.destroy(
		{ where: { id }, transaction: t },
	);
}

async function update(id: string, name: string, t: Transaction) {
	return License.update(
		{ name },
		{ where: { id }, transaction: t },
	);
}


export const licenseService = {
	getAll,
	add,
	remove,
	update,
}