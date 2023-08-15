import { Business } from '../models/Business';
import { Employee } from '../models/Employee';
import { License } from '../models/License';

async function getDeepAll() {
	return Business.findAll({
		include: [
			{
				model: Employee,
				include: [
					{
						model: License,
					},
				],
			},
		],
	});
}

async function getAll() {
	return Business.findAll();
}

async function add(id: string, name: string) {
	await Business.create({ id, name });
}

async function remove(id: string) {
	return Business.destroy({
		where: { id },
	});
}

async function update(id: string, name: string) {
	return Business.update(
		{ name },
		{ where: { id } }
	);
}

export const businessService = {
	getDeepAll,
	getAll,
	add,
	remove,
	update,
}