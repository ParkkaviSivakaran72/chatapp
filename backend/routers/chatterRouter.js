import express from 'express'
import { addChatter } from '../controllers/chatterController.js';

const chatterRouter = express.Router();

chatterRouter.post('/chatter', addChatter)

export default chatterRouter;