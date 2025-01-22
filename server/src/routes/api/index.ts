import express from 'express';
const router = express.Router();
import userRoutes from '../api/user-routes.js';

router.use('/users', userRoutes);

export default router;
