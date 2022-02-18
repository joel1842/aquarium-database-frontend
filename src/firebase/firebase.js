import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage"

const apiKey = process.env.FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey: "AIzaSyBIYPScNr__7EwEYwS7QjA3GszTCQ5UbdY",
    authDomain: "fish-o-pedia.firebaseapp.com",
    projectId: "fish-o-pedia",
    storageBucket: "fish-o-pedia.appspot.com",
    messagingSenderId: "495373922171",
    appId: "1:495373922171:web:929da0fa7067a9962797de",
    measurementId: "G-V2VW9K9ZBD"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)