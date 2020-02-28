importScripts(
  "https://cdn.jsdelivr.net/npm/idb@4.0.5/build/iife/with-async-ittr-min.js"
);
// importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-auth.js");
// importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-firestore.js");
// importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-storage.js");

const { strategies, expiration, routing } = workbox;
const { openDB } = idb;

workbox.core.skipWaiting();
workbox.core.clientsClaim();

routing.registerRoute(
  // Cache image files.
  // /.*(?:googleapis|gstatic)\.com/,
  new RegExp("^https://firebasestorage.googleapis.com/.*media&token"),
  // Use the cache if it's available.
  new strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: "image-cache-firebase",
    fetchOptions: {
      mode: "no-cors"
    },
    plugins: [
      new expiration.Plugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);

self.addEventListener("sync", function(event) {
  if (event.tag === "SYNC-NOTES") {
    console.log("my-sync activated");
    event.waitUntil(syncNotes());
  }
});

function syncNotes() {
  return new Promise(async function(resolve) {
    const db = new DB();
    await db.initDB();
    const notes = await db.getUnSyncNotes();
    if (notes.length > 0) {
      // console.log("prcesss sync", notes);
      // await firebaseService.saveNotes(notes);
      // await db.clearNotes();

      self.registration.showNotification(
        `You have ${notes.length} un-sync note(s). Click to sync them now !`
      );
      resolve();
    }
  });
}

const DB_NAME = "kip_db";
const TBL_NOTES = "tbl_notes";
const TBL_UN_SYNC_NOTES = "tbl_un_sync_notes";
const TBL_LABELS = "tbl_labels";

class DB {
  db;

  async initDB() {
    this.db = await openDB(DB_NAME, 1, {
      upgrade: (db, oldVersion, newVersion, transaction) => {
        console.log("old", oldVersion, newVersion);
        db.createObjectStore(TBL_NOTES, {
          keyPath: "id",
          autoIncrement: true
        });
        db.createObjectStore(TBL_UN_SYNC_NOTES, {
          keyPath: "id",
          autoIncrement: true
        });
        db.createObjectStore(TBL_LABELS, {
          keyPath: "id",
          autoIncrement: true
        });
      }
    });
  }

  getUnSyncNotes() {
    return this.db.getAll(TBL_UN_SYNC_NOTES);
  }

  clearNotes() {
    return this.db.clear(TBL_UN_SYNC_NOTES);
  }
}

/* class FirebaseService {
  init() {
    firebase.initializeApp({
      apiKey: "AIzaSyARC2wLjvkqC-yY9UlZwzBZfX6TApLKVa4",
      authDomain: "test-wedate.firebaseapp.com",
      databaseURL: "https://test-wedate.firebaseio.com",
      projectId: "test-wedate",
      storageBucket: "test-wedate.appspot.com",
      messagingSenderId: "406468168574",
      appId: "1:406468168574:web:839adebe3a71725f"
    });
  }

  uploadFile(noteId, base64Image) {
    const storageRef = firebase
      .storage()
      .ref()
      .child(noteId);
    return storageRef
      .putString(base64Image, "data_url")
      .then(a => a.ref.getDownloadURL());
  }

  async saveNote(note) {
    const { id, noteId, image, ...rest } = note;
    const imageUrl = await this.uploadFile(noteId, image);
    console.log("image url", imageUrl);
    await firebase
      .firestore()
      .collection("notes")
      .add({ image: imageUrl, ...rest });
    return true;
  }

  saveNotes(notes) {
    return Promise.all(notes.map(note => this.saveNote(note)));
  }
} */
