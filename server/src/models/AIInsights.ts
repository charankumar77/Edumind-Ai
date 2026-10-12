import mongoose, { Schema, Document } from 'mongoose';

export interface IAIInsight extends Document {
  student_id: mongoose.Types.ObjectId;
  weak_topics: string[];
  strong_topics: string[];
  predicted_performance: number; // expected future score out of 100
  recommended_resources: {
    type: 'video' | 'note' | 'mock_test';
    url: string;
    topic: string;
  }[];
}

const AIInsightSchema: Schema = new Schema({
  student_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  weak_topics: [{ type: String }],
  strong_topics: [{ type: String }],
  predicted_performance: { type: Number, default: 0 },
  recommended_resources: [{
    type: { type: String, enum: ['video', 'note', 'mock_test'], required: true },
    url: { type: String, required: true },
    topic: { type: String, required: true }
  }]
}, { timestamps: true });

export default mongoose.models.AIInsight
  ? (mongoose.models.AIInsight as mongoose.Model<IAIInsight>)
  : mongoose.model<IAIInsight>('AIInsight', AIInsightSchema);
