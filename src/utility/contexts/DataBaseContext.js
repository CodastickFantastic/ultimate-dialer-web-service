import { createContext, useState, useEffect } from "react";
import { database } from "../../services/firebase";

import { getDatabase, ref, onValue } from "firebase/database";

const DataBaseContext = createContext();

export function DataBaseContextProvider(props) {
//   const userDataBase = ref(database, `users/${props.userID}`);
//   onValue(userDataBase, (response)=>{
//     const data = response.val()
//     console.log(data)
//   })
  return (
    <DataBaseContext.Provider value={""}>
      {props.children}
    </DataBaseContext.Provider>
  );
}

export default DataBaseContext;
