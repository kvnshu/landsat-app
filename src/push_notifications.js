import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";

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
  "BP1xXt2rDxKKnYJgBG9JwI4PRYhyzf4bPzrEU8WqIE5oYBYfmZMm7WHdzw1NqWEknRgewl6LmCw20e-7XxBcssA";

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

getToken(messaging, { vapidKey: vapidKey })
  .then((currentToken) => {
    if (currentToken) {
      console.log(`Current registration token: ${currentToken}`);
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

onMessage(messaging, (payload) => {
  console.log("Message received by app. ", payload);
});
