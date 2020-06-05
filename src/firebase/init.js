import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAaAIvvYTxTPIMxdKZEjSOY0zY5Li6f9A8",
    authDomain: "scdf-eqr.firebaseapp.com",
    databaseURL: "https://scdf-eqr.firebaseio.com",
    projectId: "scdf-eqr",
    storageBucket: "scdf-eqr.appspot.com",
    messagingSenderId: "1001171126097",
    appId: "1:1001171126097:web:759517816d510778a6f570"
  };
  const firebaseApp = firebase.initializeApp(config);
  //export firestore database

  export default firebaseApp.firestore()
  export var analytics = firebaseApp.analytics()
  export var storage = firebaseApp.storage()
  export var functions = firebaseApp.functions()