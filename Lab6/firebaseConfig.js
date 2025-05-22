import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz4DTUnILAAXP5FFHHK5T562wF06LqeXk",
  authDomain: "quanlinhatro-1f04a.firebaseapp.com",
  projectId: "quanlinhatro-1f04a",
  storageBucket: "quanlinhatro-1f04a.firebasestorage.app",
  messagingSenderId: "935699751317",
  appId: "1:935699751317:android:b085812e526dce727a169c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();