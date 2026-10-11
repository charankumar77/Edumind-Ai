import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  subject: string;
  unit: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

const QuestionSchema: Schema = new Schema({
  subject: { type: String, required: true },
  unit: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  question_text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_answer: { type: String, required: true },
  explanation: { type: String }
}, { timestamps: true });

export default mongoose.model<IQuestion>('Question', QuestionSchema);
