import "./DownloadAppWidget.scss";

export default function DownloadAppWidget() {
  return (
    <section className="downloadAppWidget">
      <h2>Download Application</h2>
      <p>and start calling.</p>
      <div className="system">
        <a
          className="android"
          href="https://github.com/CodastickFantastic/ultimatedAutoDialerApp/releases/download/DialerApp/app-debug.apk"
        >
          <img
            src={require("../../../images/icons/android.png")}
            alt="Download app for Android"
          />
        </a>
        <a className="apple" href="#">
          <p>Available Soon</p>
          <img
            src={require("../../../images/icons/apple.png")}
            alt="Download app for IOS"
          />
        </a>
      </div>
    </section>
  );
}
