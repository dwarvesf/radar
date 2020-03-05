import uuid1 from "uuid/v1";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyARC2wLjvkqC-yY9UlZwzBZfX6TApLKVa4",
  authDomain: "test-wedate.firebaseapp.com",
  databaseURL: "https://test-wedate.firebaseio.com",
  projectId: "test-wedate",
  storageBucket: "test-wedate.appspot.com",
  messagingSenderId: "406468168574",
  appId: "1:406468168574:web:839adebe3a71725f"
});

export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log("login succes", result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function(error) {
      console.log("login error", error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

export function addNote(note) {
  return firebase
    .firestore()
    .collection("notes")
    .add(note)
    .then(ref =>
      firebase
        .firestore()
        .collection("notes")
        .doc(ref.id)
        .get()
    )
    .then(snapshot => ({ id: snapshot.id, ...snapshot.data() }));
}

export function loadNotes() {
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("notes")
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        resolve(data);
      });
  });
}

export function loadLabels() {
  return new Promise(resolve => {
    firebase
      .firestore()
      .collection("labels")
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        resolve(data);
      });
  });
}

export function uploadImage(file) {
  const name = uuid1();
  const storageRef = firebase
    .storage()
    .ref()
    .child(name);
  return storageRef.put(file).then(a => a.ref.getDownloadURL());
}

export function addLabel(label) {
  return firebase
    .firestore()
    .collection("labels")
    .add(label)
    .then(ref => {
      return firebase
        .firestore()
        .collection("labels")
        .doc(ref.id)
        .get();
    })
    .then(snapshot => ({ id: snapshot.id, ...snapshot.data() }));
}

export function updateLabel({ id, ...rest }) {
  return firebase
    .firestore()
    .collection("labels")
    .doc(id)
    .set(rest);
}

export function deleteLabel(id) {
  return firebase
    .firestore()
    .collection("labels")
    .doc(id)
    .delete();
}
