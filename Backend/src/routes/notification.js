import express from 'express'
const notificationRouter = express.Router();

import { sendNotification,saveUser,updateUserFcmToken } from "../controllers/notification.js"

notificationRouter.post('/saveuser',saveUser);
notificationRouter.post('/sendnotification',sendNotification);
notificationRouter.post('/updateuserlocation',updateUserFcmToken);

export default notificationRouter;