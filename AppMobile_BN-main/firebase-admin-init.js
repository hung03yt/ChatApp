const admin = require('firebase-admin');
const serviceAccount = require('./configs/firebase-admin.json');

// Check if Firebase Admin has already been initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = admin;
