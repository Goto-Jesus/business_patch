import express from 'express';
import { businessController } from '../controllers/business';

export const router = express.Router();

router.post('/patch', businessController.updateMany);
router.get('', businessController.getDeepAll);