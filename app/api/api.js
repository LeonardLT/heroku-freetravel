import express from 'express';
import userApi from './users-api';
import loginApi from './sessions-api';
import personal from './personal';
import items from './items-api';
import orders from './orders-api';


const router = express.Router();

router.use('/users', userApi);
router.use('/sessions', loginApi);
router.use('/personal', personal);
router.use('/items',items);
router.use('/orders',orders);

export default router;
