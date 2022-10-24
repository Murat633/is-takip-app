import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyC3IkEDsO7omMmfIyghVD4RnH6qZDobcRY",
    authDomain: "vue3-firebase-projeler-46f07.firebaseapp.com",
    projectId: "vue3-firebase-projeler-46f07",
    storageBucket: "vue3-firebase-projeler-46f07.appspot.com",
    messagingSenderId: "569981359891",
    appId: "1:569981359891:web:e82bdc65fa4c528840ece6"
  };


  firebase.initializeApp(firebaseConfig)


  const firestoreRef = firebase.firestore();
  const authRef = firebase.auth();
  const tarih = firebase.firestore.FieldValue.serverTimestamp();
  const storageRef = firebase.storage()


  export {firestoreRef,authRef,tarih,storageRef}