import express from 'express';
import { chatController } from '../controllers/chatController';

const router = express.Router();

// POST /api/chat - Process a chat message
router.post('/', chatController.processMessage);

export default router;