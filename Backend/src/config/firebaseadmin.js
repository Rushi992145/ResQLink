import admin from "firebase-admin";
import { createRequire } from "module";

import dotenv from 'dotenv';
dotenv.config();

// Use this for production (deployment )
// import serviceAccount from '../reqlink123-792ea-firebase-adminsdk-fbsvc-57f7170f2f.json' assert { type: 'json' };

// Use this for developement environment
// const require = createRequire(import.meta.url);
// const serviceAccount = require("../reqlink123-792ea-firebase-adminsdk-fbsvc-57f7170f2f.json");


// Below thing is under testing purpose 
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Parse JSON string from environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Fallback for local dev: load from file (ignored in .gitignore)
  const { createRequire } = await import("module");
  const require = createRequire(import.meta.url);
  serviceAccount = require("../reqlink123-792ea-firebase-adminsdk-fbsvc-57f7170f2f.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin; 
 