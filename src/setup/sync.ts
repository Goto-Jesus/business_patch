import { Business } from '../models/Business';
import { Employee } from '../models/Employee';
import { License } from '../models/License';
import { dbInit } from '../utils/dbInit';

// import { data } from './data';
// import { EmployeeTitle } from '../types/EmployeeTitle.enum';
// const seedInitialData = async () => {
// 	await Business.bulkCreate(data.businesses)
// 	await Employee.bulkCreate(data.employees)
// 	await License.bulkCreate(data.licenses.filter(license =>
// 		data.employees.find(employee =>
// 			employee.id === license.employeeId &&
//       employee.title === EmployeeTitle.WarehouseWorker
// 		)));
// }

const resetData = async () => {
	await Business.bulkCreate([])
	await Employee.bulkCreate([])
	await License.bulkCreate([]);
}

const sync = async () => {
	dbInit();

	await Business.sync({ force: true });
	await Employee.sync({ force: true });
	await License.sync({ force: true });

	await resetData();
}

sync();

// .sync();                 // создаст таблицу если она не сущетвует
// .sync({ force: true });  // перезапишит таблицу (удалит и создаст новую)
// .sync({ alter: true });  // модицирует таблицу

// npx ts-node src/setup/sync.ts