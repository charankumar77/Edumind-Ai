import { Router } from 'express';
import { authenticate, authorizeRole, AuthRequest } from '../middleware/authMiddleware';
import Question from '../models/Question';
import TestAttempt from '../models/TestAttempt';
import AIInsight from '../models/AIInsights';
import User from '../models/User';

const router = Router();

// Get questions by subject for a test
router.get('/questions/:subject', authenticate, async (req, res) => {
  try {
    // Fetch a random set of questions or all for the subject
    // For MVP, just return 10 random questions
    const questions = await Question.aggregate([
      { $match: { subject: req.params.subject } },
      { $sample: { size: 10 } }
    ]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
});

// Submit a test attempt
router.post('/submit', authenticate, async (req: AuthRequest, res) => {
  try {
    const { subject, questions_attempted, time_taken } = req.body;
    
    let correctCount = 0;
    const evaluatedQuestions = await Promise.all(questions_attempted.map(async (q: any) => {
      const question = await Question.findById(q.question_id);
      const is_correct = question ? question.correct_answer === q.selected_answer : false;
      if (is_correct) correctCount++;
      return {
        question_id: q.question_id,
        selected_answer: q.selected_answer,
        is_correct,
        topic: question?.topic // Used later for AI analysis
      };
    }));

    const score = correctCount;
    const accuracy = (correctCount / questions_attempted.length) * 100;

    const testAttempt = new TestAttempt({
      student_id: req.user!.id,
      subject,
      questions_attempted: evaluatedQuestions,
      score,
      accuracy,
      time_taken
    });

    await testAttempt.save();
    
    // Update User History
    await User.findByIdAndUpdate(req.user!.id, {
      $push: { performance_history: { test_id: testAttempt._id, score, timestamp: new Date() } }
    });

    // Simulated AI Logic
    const topicStats: Record<string, { total: number, correct: number }> = {};
    
    evaluatedQuestions.forEach(q => {
      if (!q.topic) return;
      if (!topicStats[q.topic]) topicStats[q.topic] = { total: 0, correct: 0 };
      topicStats[q.topic].total += 1;
      if (q.is_correct) topicStats[q.topic].correct += 1;
    });

    const weak_topics: string[] = [];
    const strong_topics: string[] = [];

    for (const [topic, stats] of Object.entries(topicStats)) {
      const topicAccuracy = stats.correct / stats.total;
      if (topicAccuracy < 0.6) weak_topics.push(topic);
      else strong_topics.push(topic);
    }

    const predicted_performance = Math.min(accuracy + 5, 100); // Simple heuristic prediction
    const recommended_resources = weak_topics.map(topic => ({
      type: 'video',
      url: `https://example.com/learn/${encodeURIComponent(topic)}`,
      topic
    }));

    await AIInsight.findOneAndUpdate(
      { student_id: req.user!.id },
      {
        student_id: req.user!.id,
        weak_topics,
        strong_topics,
        predicted_performance,
        recommended_resources
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Test submitted', score, accuracy, test_id: testAttempt._id });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting test', error });
  }
});

// Teacher routes for managing Question Bank
router.post('/question', authenticate, authorizeRole(['teacher', 'admin']), async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error });
  }
});

export default router;
