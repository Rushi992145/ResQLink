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
let serviceAccount={ "type": "service_account","project_id": "reqlink123-792ea","private_key_id": "57f7170f2f4b03b6ce3ba52dc6e2189216faba4a","private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcu0NlAjQHS2eo\nWQVBTQ/6FYC7i1i41Kh8VlF2RqBwMZHIWL7FwmfC1IbMhHn2ztCtC7qryvlD/wyF\nwTcxjzYG73zqEOvMn5e10vKrMDziwlWWtHxyoZHcvOJeGaIgJ7M8VpNTKyNp1Fyl\nU0DVPMBD7+kfW0OYWT/WXeF36FzvcqFyX1Z//7E24xphIxR12W3QLqsTXzIJvBo7\nKf+G/LLLphmGEKqqFSxBt/hw4X6Iy29APc1GnCrQyXAx1bfwUFEu3yyb2HBmJLLo\nWsYchqhECCcmEcuVxUKFvooWIhhfHwylsfF6DTzSIYT+ZomI0wIUVzlMDHKwGgoB\naKh0DTvbAgMBAAECggEAA43ViPpBxikIiYVmBkzdU7Dx+2dao0QtFvvIGwon9Ul+\nxzdM4p82WdPH14PLh3RDXfnNnR4NXYHwgnxqqEJPrYQLl0q7yJNaV9iX7Zfr22AM\nr383Z1+88g0Lhm9HD//VPBP/lNu5JIKis/SSOdTgfY7RMeoGsaRdYswBCjeeGvYx\nu/AHt/N6JDSNlzOl6inyT7ZFePCi2zuEtcNZ4XwooqmJsoTioTMUaBhM2OxQ8Cgn\nDsfJW4+0/B87gKTz30Z+eHl3Ibz0VSbuFiM4mMltZxq2oUoW+pf9cBXOW/Z/Z9ab\nFPU0aIWSblDFnqvFr1Peu2I1ZEzKd0fgOMKJu6mKjQKBgQDTJKE8EiPk69EW1yu3\nzp2qt9ftKd+febCxFR1VsKiVRi08Gmzd7ixfz/s1tjDGHj44m76gt0XzAH2xGYAa\ndTGlwYg7xDv+M3h4vKVlXmxutxAVoiRaR/dQjrrGnk4KzwMCkcMm+N+GQkuyz3aT\nYm7Jo/Olx1kkDZlzmJmX1EaHjQKBgQC+B149TwKPi9+R4CKegmFVIcrVgIGddtmJ\nq7av2tcefISQKHvGwaupJaRL2AT5LzfwuQJpzhoC609h21JrOj8r34Uihj/Nw06a\nGGbrPu+3banqCmEW8qTXmkUImr/Gev4Ihe7+NB1t6dwZjkGSaCOxFz2lA8BXB7Tc\nm+R+J4RjBwKBgFrRTZzF/LRxjhzx7jcAYybULscvFKXGtO5mM5jxBII4jipk/2Cy\nGloX3miq9e2xgnfc3bDJRAgStP2hB03aDMHMLanvbRKY1v+vvMCOTbuNeBimBlbi\nz4jR65qU6uKRSi0nvzYbJCHekCrYO5uHYjnPEHTE+x2bz949zArXXoLdAoGAU6ZI\nrLJIDUpkOwGwG5iHIgODFyK/a8JyljC5dYXe5jOn4xF/EwoT95xzS1OnNM29UUEP\nt+Wa+6f7xLbX/A2i2zxEjeMM2RXdVuXhADMvMM6cWkMBZCmhuKrXMqd0PfnMM5JJ\nlyr3vXeRhMpjQQCInZ7+atJQ676ftfEFzya0FycCgYAB7PDga99kLrBWFijcAu7d\neEjtN29XzoooWasCmhUXyIz8vyS3Pw48tBsuKyS9o0Eiqefzo3rBZQHXs8jos7q3\nPsaykm0LtFuBXWLw8vS0IxQCVhDP0FK4+GSlLy9+dEtYxJuYX+OMvHWQ+kNYZTrO\nnjLFjS9Dshx78Qzl7J/z+Q==\n-----END PRIVATE KEY-----\n","client_email": "firebase-adminsdk-fbsvc@reqlink123-792ea.iam.gserviceaccount.com", "client_id": "107930498701127775408", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40reqlink123-792ea.iam.gserviceaccount.com","universe_domain": "googleapis.com" };

// if (process.env.FIREBASE_SERVICE_ACCOUNT) {
//   // Parse JSON string from environment variable
//   serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
// } else {
//   // Fallback for local dev: load from file (ignored in .gitignore)
//   const { createRequire } = await import("module");
//   const require = createRequire(import.meta.url);
//   serviceAccount = require("../reqlink123-792ea-firebase-adminsdk-fbsvc-57f7170f2f.json");
// }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin; 
 