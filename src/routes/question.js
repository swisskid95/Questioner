import express from 'express';
import QuestionController from '../controller/questionController';

const router = express.Router();

// Post /api/v1/questions
router.post('/', QuestionController.createQuestion);

// Patch /api/v1/questions/:id/upvote
router.patch('/:id/upvote', QuestionController.increaseVote);

// Patch /api/v1/questions/:id/downvote
router.patch('/:id/downvote', QuestionController.decreaseVote);

export default router;
