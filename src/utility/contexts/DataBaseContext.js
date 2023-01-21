import { createContext, useState, useEffect } from "react";
import { database } from "../../services/firebase";

import { set, ref, onValue, update } from "firebase/database";

const DataBaseContext = createContext();

export function DataBaseContextProvider(props) {
  const userDataBase = ref(database, `users/${props.userID}`);

  function uploadContactList(databaseObj) {
    update(ref(database, `users/${props.userID}/contactLists`), databaseObj);
  }

  return (
    <DataBaseContext.Provider value={{uploadContactList}}>
      {props.children}
    </DataBaseContext.Provider>
  );
}

export default DataBaseContext;
