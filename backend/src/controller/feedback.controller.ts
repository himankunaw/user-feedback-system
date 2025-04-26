import { Request, Response } from 'express';
import Feedback from '../../models/feedback';
import { FeedbackInput, IFeedback } from '../types/feedbackTypes';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { userName, email, feedbackText, category }: FeedbackInput = req.body;
    const feedback: IFeedback = new Feedback({ userName, email, feedbackText, category });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const { category, sortBy } = req.query;
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    let sortOption: any = { createdAt: -1 };
    if (sortBy === 'oldest') {
      sortOption = { createdAt: 1 };
    }
    
    const feedback: IFeedback[] = await Feedback.find(query).sort(sortOption);
    res.json(feedback);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};