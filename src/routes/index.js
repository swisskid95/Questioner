import express from 'express';

const router = express.Router();

// Get Home Page
router.get('/', (req, res) => {
  res.send('Questioner says Hello');
});


export default router;
