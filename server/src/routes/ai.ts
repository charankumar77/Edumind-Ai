import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/authMiddleware';
import AIInsight from '../models/AIInsights';

const router = Router();

router.get('/insights', authenticate, async (req: AuthRequest, res) => {
  try {
    const insights = await AIInsight.findOne({ student_id: req.user!.id });
    if (!insights) {
      return res.status(404).json({ message: 'No insights found yet' });
    }
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AI insights', error });
  }
});

export default router;
