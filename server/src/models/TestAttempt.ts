import mongoose, { Schema, Document } from 'mongoose';

export interface ITestAttempt extends Document {
  student_id: mongoose.Types.ObjectId;
  subject: string;
  questions_attempted: {
    question_id: mongoose.Types.ObjectId;
    selected_answer: string;
    is_correct: boolean;
  }[];
  score: number;
  accuracy: number;
  time_taken: number; // in seconds
  timestamp: Date;
}

const TestAttemptSchema: Schema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  questions_attempted: [{
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    selected_answer: { type: String, required: true },
    is_correct: { type: Boolean, required: true }
  }],
  score: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  time_taken: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model<ITestAttempt>('TestAttempt', TestAttemptSchema);
