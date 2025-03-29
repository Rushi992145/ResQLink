import admin from "firebase-admin";

import dotenv from 'dotenv';
dotenv.config();

import serviceAccount from '../hackathon2-3d3c7-firebase-adminsdk-fbsvc-e8edf8c75d.json' assert { type: 'json' };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin; 
 