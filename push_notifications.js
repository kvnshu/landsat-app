import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBuRs7XlvnndAdepZtYSO1n69_huk6ocI4",
  authDomain: "landsatnow.firebaseapp.com",
  projectId: "landsatnow",
  storageBucket: "landsatnow.firebasestorage.app",
  messagingSenderId: "1382410228",
  appId: "1:1382410228:web:319b348aae0ed23962fba1",
  measurementId: "G-DNENSTWH08",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);
const vapidKey =
  "BGrpJuRZzxmgDpvJvyTntShu6ZmvH3kNh5BAiW9WgTi3Ewh7DXsRmy46H9rix1tDmXuUtLN7VPlt8B-21uSiddc";

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    })
    .catch((error) => {
      console.error("Unable to get permission to notify.", error);
    });
}
requestPermission();

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
getToken(messaging, { vapidKey: vapidKey }).then((currentToken) => {
  if (currentToken) {
    console.log("Current registration token:", currentToken);
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
