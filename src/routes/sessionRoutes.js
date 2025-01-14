import express from 'express';
import { createSession, getAllSessions, updateSession, deleteSession } from '../controllers/sessionController.js';
import {userAuthMiddleware} from '../middlewares/userAuthMiddleware.js';
const router = express.Router();

router.post('/', userAuthMiddleware, createSession);

router.get('/', userAuthMiddleware, getAllSessions);

router.put('/:id', userAuthMiddleware, updateSession);

router.delete('/:id', userAuthMiddleware, deleteSession);

export default router;
