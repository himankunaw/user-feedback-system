import { Schema, model } from 'mongoose';
import { IFeedback } from '../src/types/feedbackTypes';

const feedbackSchema = new Schema<IFeedback>({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  feedbackText: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['suggestion', 'bug', 'feature', 'other'],
    default: 'suggestion'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model<IFeedback>('Feedback', feedbackSchema);