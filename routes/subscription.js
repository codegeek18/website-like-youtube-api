import express from 'express';
import { subscriptionController, getAllSubscriptions, deleteSubscriptionController } from '../controllers/subscription.js';
import auth from '../middleware/auth.js';

const routes = express.Router();


routes.post('/', auth, subscriptionController);
routes.get('/', getAllSubscriptions);
routes.delete('/:ChannelSubscribed/:Subscriber', auth, deleteSubscriptionController);

export default routes;