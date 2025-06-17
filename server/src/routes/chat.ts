import express, { Request, Response } from 'express';
import { generateRuleResponse } from '../services/chatService';

const router = express.Router();

/**
 * @route POST /api/chat
 * @description Process a user question about NBA rules and return a response
 * @access Public
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ status: 'error', message: 'Message is required and must be a string' });
    }

    const response = await generateRuleResponse(message);
    
    res.status(200).json({
      status: 'success',
      data: { response }
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process your question. Please try again.'
    });
  }
});

export default router;