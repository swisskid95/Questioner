import express from 'express';

const router = express.Router();

// Get Home Page
router.get('/', (req, res) => {
  res.status(300).redirect('/api/v1/meetups');
});

export default router;
