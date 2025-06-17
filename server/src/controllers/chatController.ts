import { Request, Response } from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { PineconeStore } from '../services/pineconeStore';

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize vector store
const vectorStore = new PineconeStore();

export const chatController = {
  processMessage: async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Temporarily bypass vector store for MVP - will be implemented later
      /* 
      // Get relevant rule fragments from vector store
      const relevantRules = await vectorStore.search(message);

      // Combine rules into context
      const context = relevantRules.map(rule => rule.text).join('\n\n');
      */

      // For MVP, use GPT directly with a prompt that instructs it about NBA rules
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are RuleBook Bot, an AI assistant that helps explain NBA rules in simple, clear language. When responding to questions, explain the relevant rules in a way that is easy to understand, and include the specific rule reference from the NBA rulebook when possible.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const response = completion.choices[0].message.content;

      return res.status(200).json({ response });
    } catch (error) {
      console.error('Error processing message:', error);
      return res.status(500).json({ error: 'Error processing your request' });
    }
  },
};