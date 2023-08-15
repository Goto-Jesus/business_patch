import express from 'express';
import { employeeController } from '../controllers/employee';

export const router = express.Router();

router.get('', employeeController.getDeepAll);
