
import 'firebase/storage'
import firebase from 'firebase/app'
import 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDaSUcIU2HAqbh9Gnxh3qmwGHdukkVveVs",
  authDomain: "festivals-b8987.firebaseapp.com",
  projectId: "festivals-b8987",
  databaseURL:"https://festivals-b8987-default-rtdb.firebaseio.com/",
  storageBucket: "festivals-b8987.appspot.com",
  messagingSenderId: "304849449258",
  appId: "1:304849449258:web:281026572e1a1c7784ae53",
  measurementId: "G-6FPJW406W6"
 
};
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
 // firebase.analytics();
  const storage = firebase.storage()
  const database = firebase.database();
  export  {
    storage,database,firebase  as default
  }
  