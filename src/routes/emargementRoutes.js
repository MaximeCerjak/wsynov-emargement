import express from 'express';
import { addEmargement, getEmargementsBySession } from '../controllers/emargementController.js';
import {userAuthMiddleware} from '../middlewares/userAuthMiddleware.js';

const router = express.Router();

router.post('/', userAuthMiddleware, addEmargement);

router.get('/:session_id', userAuthMiddleware, getEmargementsBySession);

export default router;
