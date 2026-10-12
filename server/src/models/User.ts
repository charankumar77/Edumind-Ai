import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  picture?: string;
  role: 'student' | 'teacher' | 'admin';
  subscribed_subjects?: string[];
  performance_history?: {
    test_id: mongoose.Types.ObjectId;
    score: number;
    timestamp: Date;
  }[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  subscribed_subjects: [{ type: String }],
  performance_history: [{
    test_id: { type: Schema.Types.ObjectId, ref: 'TestAttempt' },
    score: { type: Number },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User
  ? (mongoose.models.User as Model<IUser>)
  : mongoose.model<IUser>('User', UserSchema);

export default User;
