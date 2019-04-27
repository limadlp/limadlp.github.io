
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCHT1T4WTTdY7y0t7ZNpRN9GTHIOLSGuAg",
    authDomain: "appdebts.firebaseapp.com",
    databaseURL: "https://appdebts.firebaseio.com",
    projectId: "appdebts",
    storageBucket: "appdebts.appspot.com",
    messagingSenderId: "184074154275"
  };
  firebase.initializeApp(config);
  firebase.firestore().enablePersistence()
  .then(function() {
      // Initialize Cloud Firestore through firebase
      var db = firebase.firestore();
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });