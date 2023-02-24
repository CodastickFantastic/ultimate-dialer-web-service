import { createContext, useState, useEffect } from "react";
import { database } from "../../services/firebase";

import { get, ref, onValue, update } from "firebase/database";

const DataBaseContext = createContext();

export function DataBaseContextProvider(props) {
  const [userDataBase, setUserDataBase] = useState("");

  // Always get present version of Database
  useEffect(() => {
    onValue(ref(database, `users/${props.user.uid}/`), (response) => {
      setUserDataBase(response.val());
    });
  }, []);

  //If there is no stats section in database - create it
  if (userDataBase !== null) {
    console.log(userDataBase);
    if (userDataBase.stats === undefined) {
      let statsObj = {
        stats: { totalAnsweredCalls: 0, totalDoneCalls: 0, totalLeads: 0 },
      };
      update(ref(database, `users/${props.user.uid}`), statsObj);
    }
  }

  // Upload Contact List Function
  function uploadContactList(databaseObj) {
    update(ref(database, `users/${props.user.uid}/contactLists`), databaseObj);
  }

  return (
    <DataBaseContext.Provider value={{ uploadContactList, userDataBase }}>
      {props.children}
    </DataBaseContext.Provider>
  );
}

export default DataBaseContext;
