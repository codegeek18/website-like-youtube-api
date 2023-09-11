import express from 'express';
import { login, phoneUserController } from '../controllers/auth.js';
import { updateChannelData, getAllChannels } from '../controllers/channel.js';

const routes = express.Router();

routes.post('/phoneUser', phoneUserController);
routes.post('/login', login);
routes.patch('/update/:id', updateChannelData);
routes.get('/getAllChannels', getAllChannels);

export default routes;