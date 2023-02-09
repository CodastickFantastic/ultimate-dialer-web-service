import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../../services/firebase.js";

import "./Navigation.scss";

export default function Navigation({ user }) {
  //Active Navigation Handling
  useEffect(() => {
    const navButtons = Array.from(
      document.querySelectorAll(".sideNavigation li")
    );

    navButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        navButtons.forEach((button) => {
          button.className = "";
        });
        e.target.parentElement.className = "active";
      });
    });
  }, []);

  return (
    <>
      <section className="sideNavigation">
        <img
          src={require("../../images/logo.png")}
          alt="Autoamted Dialer - No more calls dialing"
          className="logo"
        />
        <nav>
          <ul>
            <li className="active">
              <Link to="/">
                <img
                  src={require("../../images/icons/home.png")}
                  alt="Go to dashboard"
                />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/add-contact-list">
                <img
                  src={require("../../images/icons/add_list.png")}
                  alt="Add contact list"
                />
                Add Contact List
              </Link>
            </li>
            <li>
              <Link to="/">
                <img
                  src={require("../../images/icons/list.png")}
                  alt="Go to contact list"
                />
                Contact List
              </Link>
            </li>
            <li>
              <Link to="/">
                <img
                  src={require("../../images/icons/sms.png")}
                  alt="Go to bulk sms"
                />
                Bulk SMS
              </Link>
            </li>
            <li>
              <Link to="/">
                <img
                  src={require("../../images/icons/settings.png")}
                  alt="Go to settings"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="currentUser">
          <img
            src={user.photoURL}
            alt="User avatar"
            referrerPolicy="no-referrer"
          />
          <p>{user.displayName}</p>
        </div>
        <button onClick={() => auth.signOut()}>Logout</button>
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}
