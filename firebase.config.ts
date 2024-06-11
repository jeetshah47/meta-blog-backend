import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCKoVbPZ3d9TBMyunt5WDf3VSYsq3eyH4o',
  authDomain: 'meta-blogs-35b64.firebaseapp.com',
  databaseURL: 'https://meta-blogs-35b64-default-rtdb.firebaseio.com',
  projectId: 'meta-blogs-35b64',
  storageBucket: 'meta-blogs-35b64.appspot.com',
  messagingSenderId: '111464389050',
  appId: '1:111464389050:web:a4a6eb57795ce7a3bce583',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
