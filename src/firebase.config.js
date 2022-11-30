import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBe0Rp7OHl2mE6QCcDJu0Hz1zcbfxciRQw",
  authDomain: "chat-app-3acdd.firebaseapp.com",
  projectId: "chat-app-3acdd",
  storageBucket: "chat-app-3acdd.appspot.com",
  messagingSenderId: "605579249480",
  appId: "1:605579249480:web:9cbed479b426504256157d",
  measurementId: "G-403R7EPGWW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
