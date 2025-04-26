import { Document } from 'mongoose';

export interface IFeedback extends Document {
  userName: string;
  email: string;
  feedbackText: string;
  category: 'suggestion' | 'bug' | 'feature';
  createdAt: Date;
}

export type FeedbackInput = {
  userName: string;
  email: string;
  feedbackText: string;
  category: 'suggestion' | 'bug' | 'feature';
};