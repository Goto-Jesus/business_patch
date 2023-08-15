import { Transaction } from 'sequelize';
import { Employee } from '../models/Employee';
import { License } from '../models/License';
import { IEmployee } from '../types/IEmployee';
import { EmployeeTitle } from '../types/EmployeeTitle.enum';

async function getDeepAll() {
	return Employee.findAll({
		include: [
			{
				model: License,
			},
		],
	});
}

async function getAll() {
	return Employee.findAll();
}

async function add({ id, name, title, businessId }: IEmployee, t: Transaction) {
	return Employee.create({ id, name, title, businessId }, { transaction: t });
}

async function remove(id: string, t: Transaction) {
	return Employee.destroy({ where: { id }, transaction: t });
}

async function unlink(id: string, t: Transaction) {
	return Employee.update(
		{ business_id: null },
		{ where: { id }, transaction: t },
	);
}

async function update(id: string, title: EmployeeTitle, t: Transaction) {
	return Employee.update(
		{ title },
		{ where: { id }, transaction: t },
	);
}

export const employeeService = {
	getDeepAll,
	getAll,
	add,
	remove,
	unlink,
	update,
};
