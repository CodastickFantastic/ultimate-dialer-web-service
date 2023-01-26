import "./LogInScreen.css"

import {signInWithGoogle} from "../../services/firebase.js"

export default function LogInScreen() {
  return (
    <div className="loginScreen">
    <h1>Ultimated Auto Dialer</h1>
    <h2>Web Control Panel</h2>
      <button className="loginBtn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <div className="downloadApp">
        <p>Don't you have Android application to work with ?</p>
        <a href="https://github.com/CodastickFantastic/ultimatedAutoDialerApp/releases/download/DialerApp/app-debug.apk">Download Ultimate Automated Dialer Beta</a>
      </div>
    </div>
  );
}
