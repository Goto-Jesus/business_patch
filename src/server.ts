import express from 'express';
import cors from 'cors';
import { dbInit } from './utils/dbInit';

import { router as businessRouter } from './routes/business';
import { router as employeeRouter } from './routes/employee';

const app = express();
const PORT = 7090;

export const dbInstance = dbInit(); // connecting to DB from neon.tech

app.use(cors());

app.use('/business', express.json(), businessRouter);
app.use('/employee', express.json(), employeeRouter);

app.listen(PORT, () => {
	console.log(`Server is running http://localhost:${PORT}`);
});
