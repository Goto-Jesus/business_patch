import { EmployeeTitle } from '../types/EmployeeTitle.enum';

const businesses = [
	{
		id: '1',
		name: 'TechCorp',
	},
	{
		id: '2',
		name: 'Logistics Ltd.',
	},
	{
		id: '3',
		name: 'Retail Store',
	},
	{
		id: '4',
		name: 'Software Solutions',
	},
	{
		id: '5',
		name: 'Hospitality Group',
	},
];

const employees = [
	{
		id: '1',
		name: 'John Doe',
		title: EmployeeTitle.RegionalManager,
		businessId: '1',
	},
	{
		id: '2',
		name: 'Jane Smith',
		title: EmployeeTitle.SalesManager,
		businessId: '1',
	},
	{
		id: '3',
		name: 'Mike Johnson',
		title: EmployeeTitle.WarehouseWorker,
		businessId: '2',
	},
	{
		id: '4',
		name: 'Emily Brown',
		title: EmployeeTitle.WarehouseWorker,
		businessId: '2',
	},
	{
		id: '5',
		name: 'Alex Clark',
		title: EmployeeTitle.Greeter,
		businessId: '3',
	},
	{
		id: '6',
		name: 'Sarah Williams',
		title: EmployeeTitle.RegionalManager,
		businessId: '3',
	},
	{
		id: '7',
		name: 'Michael Lee',
		title: EmployeeTitle.SalesManager,
		businessId: '4',
	},
	{
		id: '8',
		name: 'Linda Martinez',
		title: EmployeeTitle.WarehouseWorker,
		businessId: '4',
	},
	{
		id: '9',
		name: 'David Taylor',
		title: EmployeeTitle.WarehouseWorker,
		businessId: '5',
	},
	{
		id: '10',
		name: 'Jennifer Jackson',
		title: EmployeeTitle.Greeter,
		businessId: '5',
	},
	{
		id: '11',
		name: 'Christopher Harris',
		title: EmployeeTitle.RegionalManager,
		businessId: '1',
	},
	{
		id: '12',
		name: 'Maria Wilson',
		title: EmployeeTitle.SalesManager,
		businessId: '2',
	},
	{
		id: '13',
		name: 'James Davis',
		title: EmployeeTitle.WarehouseWorker,
		businessId: '2',
	},
	{
		id: '14',
		name: 'Jessica Rodriguez',
		title: EmployeeTitle.WarehouseWorker,
		businessId: '3',
	},
	{
		id: '15',
		name: 'Daniel Martinez',
		title: EmployeeTitle.Greeter,
		businessId: '3',
	},
];

const licenses = [
	{
		id: '1',
		name: 'Driver License',
		issuerName: 'Department of Motor Vehicles',
		employeeId: '3',
	},
	{
		id: '2',
		name: 'Forklift Operator',
		issuerName: 'Safety Association',
		employeeId: '3',
	},
	{
		id: '3',
		name: 'Sales Certification',
		issuerName: 'Company Training',
		employeeId: '2',
	},
	{
		id: '4',
		name: 'Security Guard',
		issuerName: 'State Licensing Agency',
		employeeId: '5',
	},
	{
		id: '5',
		name: 'First Aid Training',
		issuerName: 'Red Cross',
		employeeId: '1',
	},
	{
		id: '6',
		name: 'Sales License',
		issuerName: 'Company Certification',
		employeeId: '7',
	},
	{
		id: '7',
		name: 'Forklift Operator',
		issuerName: 'Safety Association',
		employeeId: '8',
	},
	{
		id: '8',
		name: 'Manager Certification',
		issuerName: 'Business Training',
		employeeId: '6',
	},
	{
		id: '9',
		name: 'Security Guard',
		issuerName: 'State Licensing Agency',
		employeeId: '10',
	},
	{
		id: '10',
		name: 'First Aid Training',
		issuerName: 'Red Cross',
		employeeId: '11',
	},
	{
		id: '11',
		name: 'Sales Certification',
		issuerName: 'Company Training',
		employeeId: '12',
	},
	{
		id: '12',
		name: 'Forklift Operator',
		issuerName: 'Safety Association',
		employeeId: '13',
	},
	{
		id: '13',
		name: 'Manager Certification',
		issuerName: 'Business Training',
		employeeId: '14',
	},
	{
		id: '14',
		name: 'Security Guard',
		issuerName: 'State Licensing Agency',
		employeeId: '15',
	},
	{
		id: '15',
		name: 'First Aid Training',
		issuerName: 'Red Cross',
		employeeId: '9',
	},
];

export const data = {
	businesses,
	employees,
	licenses
}