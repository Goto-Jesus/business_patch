import { Sequelize } from 'sequelize-typescript'
import { models } from '../models';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const URI = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

export const dbInit = () => {
	try {
		const db = new Sequelize(
			URI,
			{
				models, // <---
				dialectOptions: {
					ssl: true,
				}
			}
		);

		console.log('DB successfully initialized!');
		return db;
	} catch (error) {
		console.log('DB faild to connect!', error);
		return null;
	}
}