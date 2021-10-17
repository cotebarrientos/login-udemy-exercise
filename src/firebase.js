import myApp from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "crud-simple-app-udemy.firebaseapp.com",
    projectId: "crud-simple-app-udemy",
    storageBucket: "crud-simple-app-udemy.appspot.com",
    messagingSenderId: "704944000617",
    appId: "1:704944000617:web:9c600c494a0ae8d3d09cf8"
  };
  
  // Initialize Firebase
  myApp.initializeApp(firebaseConfig);

  const db = myApp.firestore() 
  const auth = myApp.auth()
  
  export {db, auth};