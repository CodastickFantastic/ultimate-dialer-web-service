import "./LogInScreen.scss";

import { signInWithGoogle } from "../../services/firebase.js";

export default function LogInScreen() {
  return (
    <div className="loginScreen">
      <img
        src={require("../../images/logo.png")}
        alt="Automated Dialer - No more calls dialing"
      />
      <button className="loginBtn" onClick={signInWithGoogle}>
        <img
          src={require("../../images/icons/google.png")}
          alt="Login with Google Account"
        />
        Sign in with Google
      </button>

      <div className="downloadApp">
        <p>Don't you have Android application to work with ?</p>
        <p>
          Download <span className="coloredText">Automated Dialer - Beta</span>{" "}
          and start calling.
        </p>
        <div className="downloadFor">
          <div className="downloadItem android">
            <a href="https://github.com/CodastickFantastic/ultimatedAutoDialerApp/releases/download/DialerApp/app-debug.apk">
              <img
                src={require("../../images/icons/android.png")}
                alt="Download Automated Dialer Beta for Android"
              />
              Android
            </a>
          </div>
          <div className="downloadItem apple">
          <p className="notAvailable">Will be added in the future...</p>
            <a href="#">
              <img
                src={require("../../images/icons/apple.png")}
                alt="Download Automated Dialer Beta for IOS"
              />
              IOS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
