import mongoose, { Schema, Document, Model } from 'mongoose';

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

const Question: Model<IQuestion> = mongoose.models.Question
  ? (mongoose.models.Question as Model<IQuestion>)
  : mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
