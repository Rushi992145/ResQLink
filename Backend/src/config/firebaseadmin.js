import admin from "firebase-admin";

import dotenv from 'dotenv';
dotenv.config();

import serviceAccount from '../disaster-relief-37cdd-firebase-adminsdk-fbsvc-4a10562e4a.json' assert { type: 'json' };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin; 
 