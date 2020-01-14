import express from 'express';
import { time } from '../controllers/blog';
export const router = express.Router();

router.get('/',time);