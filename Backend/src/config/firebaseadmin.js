import admin from "firebase-admin";

import dotenv from 'dotenv';
dotenv.config();

import serviceAccount from '../disaster-relief-22af7-firebase-adminsdk-fbsvc-1d924bf5d0.json' assert { type: 'json' };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin; 
 