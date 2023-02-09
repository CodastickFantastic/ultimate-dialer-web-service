import "./Dashboard.css";

import UploadContactList from "../UploadContactList/UploadContactList";
import MyContactList from "../MyContactList/MyContactList";
import ShowListResult from "../ShowListResult/ShowListResult";

import { DataBaseContextProvider } from "../../utility/contexts/DataBaseContext";

import { XlxsToObjContextProvider } from "../../utility/contexts/XlxsToObjContext";

import { useState } from "react";

export default function Dashboard({ user }) {
  const [resultList, setResultList] = useState();
  // console.log(user);
  function showListResult(e) {
    console.log(e);
  }
  return (
    <div className="dashboardContainer">
      <header>
        <h1>Ultimated Auto Dialer</h1>
        <h2>Hi {user.displayName}</h2>
      </header>
      <main>
        <DataBaseContextProvider userID={user.uid}>
          <XlxsToObjContextProvider>
            {/* <UploadContactList /> */}
          </XlxsToObjContextProvider>
          <div className="dashboardRight">
            <MyContactList userID={user.uid} showListResult={showListResult} />
            <ShowListResult userID={user.uid} />
          </div>
        </DataBaseContextProvider>
      </main>
    </div>
  );
}
