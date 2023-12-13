/* eslint-disable no-undef */
// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAS0aJAVx5CiT5M1KloyjDEKBuAh50y5dE",
  authDomain: "fir-cloud-messaging-ab946.firebaseapp.com",
  projectId: "fir-cloud-messaging-ab946",
  storageBucket: "fir-cloud-messaging-ab946.appspot.com",
  messagingSenderId: "1024280230173",
  appId: "1:1024280230173:web:4f3ec157bac3b7b14489f4"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
});