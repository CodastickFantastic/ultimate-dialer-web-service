import { createContext, useState, useEffect } from "react";
import { database } from "../../services/firebase";

import { get, ref, onValue, update } from "firebase/database";

const DataBaseContext = createContext();

export function DataBaseContextProvider(props) {
  const [userDataBase, setUserDataBase] = useState("")

  function uploadContactList(databaseObj) {
    update(ref(database, `users/${props.userID}/contactLists`), databaseObj);
  }

  useEffect(()=>{
    onValue(ref(database, `users/${props.userID}/`), (response) => {
      setUserDataBase(response.val())
    } )
  },[])

  return (
    <DataBaseContext.Provider value={{uploadContactList, userDataBase}}>
      {props.children}
    </DataBaseContext.Provider>
  );
}

export default DataBaseContext;
