import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCIbaDImF8qjKxTDIhcBs9KSJYBMNMq61Y",
  authDomain: "chatapp-bcbad.firebaseapp.com",
  projectId: "chatapp-bcbad",
  storageBucket: "chatapp-bcbad.firebasestorage.app",
  messagingSenderId: "685500490948",
  appId: "1:685500490948:web:92f2c3498ea8ae022ad591",
  measurementId: "G-K3MTDFENML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
