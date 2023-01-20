import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD781VpPqvNW8dURmDRisgAFRKtN5LyWF4",
  authDomain: "ultimatedialerapp.firebaseapp.com",
  databaseURL:
    "https://ultimatedialerapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ultimatedialerapp",
  storageBucket: "ultimatedialerapp.appspot.com",
  messagingSenderId: "643640911504",
  appId: "1:643640911504:web:f1bb71b4fdb0a28af79a15",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = getDatabase(app)

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export function signInWithGoogle() {
  auth.signInWithPopup(provider);
}

export default firebase;
