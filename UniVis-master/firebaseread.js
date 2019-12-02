//Getting firebase data
var firebase = require('firebase');
require('firebase/database');
//Configuration for firebase
var app = firebase.initializeApp({
    apiKey: "AIzaSyCmydi-tlkZnFyT-BVF8QwNMhW8HkEWAE0",
  authDomain: "univiz.firebaseapp.com",
  databaseURL: "https://univiz.firebaseio.com",
  projectId: "univiz",
  storageBucket: "univiz.appspot.com",
  messagingSenderId: "982900907406",
  appId: "1:982900907406:web:a7cc382058d0b831da98df"
 });

 //Reading firebase for first time load
 var ref = firebase.app().database().ref();
 ref.once('value')
  .then(function (snap) {
  console.log('snap.val()', snap.val());
  });