import express from 'express';
import getMeetups from '../models/meetups';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: getMeetups(),
  });
});

export default router;
