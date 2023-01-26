import "./Dashboard.css";

import UploadContactList from "../UploadContactList/UploadContactList";
import MyContactList from "../MyContactList/MyContactList"
import { DataBaseContextProvider } from "../../utility/contexts/DataBaseContext";

import { XlxsToObjContextProvider } from "../../utility/contexts/XlxsToObjContext";

import { auth } from "../../services/firebase.js";

export default function Dashboard({ user }) {
  // console.log(user);
  return (
    <div className="dashboardContainer">
      <header>
        <h1>Ultimated Auto Dialer</h1>
        <h2>Hi {user.displayName}</h2>
        <button onClick={() => auth.signOut()}>Sign-Out</button>
      </header>
      <main>
        <DataBaseContextProvider userID={user.uid}>
          <XlxsToObjContextProvider>
            <UploadContactList />
            <div className="dashboardRight">
            <MyContactList />
            </div>
          </XlxsToObjContextProvider>
        </DataBaseContextProvider>
      </main>
    </div>
  );
}
