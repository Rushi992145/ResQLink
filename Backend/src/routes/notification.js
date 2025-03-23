import express from 'express'
const notificationRouter = express.Router();

import { sendNotification,saveUser } from "../controllers/notification.js"

notificationRouter.post('/saveuser',saveUser);
notificationRouter.post('/sendnotification',sendNotification);

export default notificationRouter;