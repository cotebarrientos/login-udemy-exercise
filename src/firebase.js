import myApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "login-udemy-exercise.firebaseapp.com",
    projectId: "login-udemy-exercise",
    storageBucket: "login-udemy-exercise.appspot.com",
    messagingSenderId: "1028739090166",
    appId: "1:1028739090166:web:132d653dd9feccdc4aced7"
  };
  
  // Initialize Firebase
  myApp.initializeApp(firebaseConfig);

  const db = myApp.firestore() 
  const auth = myApp.auth()
  
  export {db, auth};